package com.example.template.service.impl.auth;

import com.example.template.common.enums.ERole;
import com.example.template.common.enums.ETokenType;
import com.example.template.common.enums.EUserStatus;
import com.example.template.common.enums.ErrorCode;
import com.example.template.dto.request.*;
import com.example.template.dto.response.TokenResponse;
import com.example.template.exception.BadRequestException;
import com.example.template.exception.InvalidDataException;
import com.example.template.exception.JwtAuthenticationException;
import com.example.template.exception.ResourceNotFoundException;
import com.example.template.model.Role;
import com.example.template.model.Token;
import com.example.template.model.User;
import com.example.template.repository.RoleRepository;
import com.example.template.repository.UserRepository;
import com.example.template.service.auth.AuthenticationService;
import com.example.template.service.auth.JwtService;
import com.example.template.service.mail.MailService;
import com.example.template.service.token.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "AUTH-SERVICE")
public class AuthenticationServiceImpl implements AuthenticationService {

    @Value("${endpoint.confirmUser}")
    private String endPointConfirmUser;

    @Value("${endpoint.endPointResetPassword}")
    private String endPointResetPassword;

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RoleRepository roleRepository;
    private final MailService mailService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    private final Map<String, PendingRegistration> pendingRegistrations = new java.util.concurrent.ConcurrentHashMap<>();

    @Value("${google.client-id}")
    private String googleClientId;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public TokenResponse accessToken(LoginRequest request, HttpServletRequest httpServletRequest) {
        String loginIdentifier = StringUtils.hasText(request.getUsername()) ? request.getUsername() : request.getEmail();

        if (!StringUtils.hasText(loginIdentifier)) {
            throw new BadRequestException("validation.login.username_or_email.not_blank");
        }

        List<String> roles;
        User user;

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginIdentifier, request.getPassword()));

            user = (User) authentication.getPrincipal();
            roles = extractRoles(authentication.getAuthorities());

        } catch (BadCredentialsException e) {
            log.error("errorMessage: {}", e.getMessage());
            throw new BadCredentialsException(e.getMessage());
        }

        String username = user.getUsername();
        String accessToken = jwtService.generateAccessToken(username, roles);
        String refreshToken = jwtService.generateRefreshToken(username, roles);

        tokenService.saveToken(username, refreshToken, httpServletRequest);

        return TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .username(username)
                .build();
    }

    @Override
    public TokenResponse refreshToken(HttpServletRequest request) {
        log.info("Get new access token called");
        final String refreshToken = request.getHeader("X-Refresh-Token");

        if (!StringUtils.hasText(refreshToken)) {
            throw new InvalidDataException("auth.refresh_token_empty");
        }

        final String username = jwtService.extractUsername(refreshToken, ETokenType.REFRESH_TOKEN);

        Token token = tokenService.getByRefreshToken(refreshToken);

        if (Boolean.TRUE.equals(token.getIsRevoked())) {
            throw new InvalidDataException("auth.token_revoked");
        }

        if (token.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new InvalidDataException("auth.refresh_token_expired");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid username"));

        jwtService.isTokenValid(refreshToken, ETokenType.REFRESH_TOKEN, user);

        List<String> roles = extractRoles(user.getAuthorities());

        String accessToken = jwtService.generateAccessToken(username, roles);

        return TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .username(user.getUsername())
                .build();
    }

    private List<String> extractRoles(Collection<? extends GrantedAuthority> authorities) {
        return authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
    }

    @Override
    public void logout(HttpServletRequest request) {
        final String refreshToken = request.getHeader("X-Refresh-Token");

        if (!StringUtils.hasText(refreshToken)) {
            throw new InvalidDataException("auth.token_missing");
        }

        final String username = jwtService.extractUsername(refreshToken, ETokenType.REFRESH_TOKEN);

        tokenService.revokedByRefreshToken(refreshToken);

        log.info("Logout successful username {} ", username);
    }

    @Override
    public void register(RegisterRequest request) {
        log.info("Processing register for user: {}", request.getUsername());

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new InvalidDataException("auth.confirm_password_mismatch");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new InvalidDataException("auth.username_exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new InvalidDataException("auth.email_exists");
        }

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new InvalidDataException("auth.phone_exists");
        }

        String randomCode = String.format("%06d", new java.util.Random().nextInt(999999));

        PendingRegistration pendingRegistration = PendingRegistration.builder()
                .request(request)
                .otpCode(randomCode)
                .expirationTime(LocalDateTime.now().plusMinutes(5))
                .build();
        
        pendingRegistrations.put(request.getEmail(), pendingRegistration);

        mailService.sendOtpEmail(request.getEmail(), randomCode);

        log.info("OTP has been sent for registration of user: {}", request.getUsername());
    }

    @Override
    public void forgotPassword(ForgotPasswordRequest request) {
        log.info("Processing forgot password for user: {}", request.getEmail());
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            log.info("Forgot password requested for non-existent email {}", request.getEmail());
            return;
        }

        User user = userOptional.get();

        String resetPasswordToken = jwtService.generateResetPasswordToken(user.getUsername());
        mailService.sendResetPasswordLink(request.getEmail(), endPointResetPassword, resetPasswordToken);

        log.info("User {} has been sent email to reset password", user.getUsername());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean confirmRegister(String email, String verifyCode) {
        log.info("Processing verify code for register for email: {}", email);

        PendingRegistration pendingRegistration = pendingRegistrations.get(email);
        if (pendingRegistration == null) {
            throw new ResourceNotFoundException("auth.pending_registration_not_found");
        }

        if (!pendingRegistration.getOtpCode().equals(verifyCode)) {
            throw new InvalidDataException("auth.invalid_verification_code");
        }

        if (LocalDateTime.now().isAfter(pendingRegistration.getExpirationTime())) {
            pendingRegistrations.remove(email);
            log.error("Verification code expired for email {}", email);
            throw new InvalidDataException("auth.verification_code_expired");
        }

        RegisterRequest request = pendingRegistration.getRequest();

        // Double check existence in case it was created concurrently
        if (userRepository.existsByUsername(request.getUsername()) || userRepository.existsByEmail(request.getEmail())) {
            pendingRegistrations.remove(email);
            throw new InvalidDataException("auth.user_already_exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setGender(request.getGender());
        user.setDateOfBirth(request.getBirthday());
        user.setPhone(request.getPhone());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setStatus(EUserStatus.ACTIVE);

        Role role = roleRepository.findByName(ERole.USER);
        user.setRoles(new HashSet<>(List.of(role)));

        userRepository.save(user);
        pendingRegistrations.remove(email);

        log.info("User {} has been verified and saved to database", user.getUsername());
        return true;
    }

    @Override
    public void verifyResetPasswordToken(String token) {
        getUserFromResetPasswordToken(token);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void resetPassword(String token, ResetPasswordRequest request) {
        User user = getUserFromResetPasswordToken(token);

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new InvalidDataException("auth.confirm_password_mismatch");
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        log.info("Reset password successfully");
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public TokenResponse googleLogin(GoogleLoginRequest request, HttpServletRequest httpServletRequest) {
        log.info("Verifying Google OIDC ID Token using Spring Security OAuth2");

        try {
            NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withIssuerLocation("https://accounts.google.com").build();

            Jwt jwt = jwtDecoder.decode(request.getToken());

            if (!jwt.getAudience().contains(googleClientId)) {
                log.error("Invalid Audience in ID Token");
                throw new InvalidDataException("Token belongs to a different client");
            }

            String email = jwt.getClaim("email");
            String googleId = jwt.getSubject();
            String firstName = jwt.getClaim("given_name");
            String lastName = jwt.getClaim("family_name");
            String pictureUrl = jwt.getClaim("picture");

            Optional<User> userOptional = userRepository.findByGoogleId(googleId);
            User user;

            if (userOptional.isPresent()) {
                user = userOptional.get();
            } else {
                userOptional = userRepository.findByEmail(email);

                if (userOptional.isPresent()) {
                    user = userOptional.get();
                    user.setGoogleId(googleId);
                    if (user.getAvatarUrl() == null) {
                        user.setAvatarUrl(pictureUrl);
                    }
                    userRepository.save(user);
                } else {
                    user = new User();
                    user.setEmail(email);
                    user.setUsername(email);
                    user.setFirstName(firstName != null ? firstName : "User");
                    user.setLastName(lastName != null ? lastName : "Google");
                    user.setGoogleId(googleId);
                    user.setAvatarUrl(pictureUrl);
                    user.setStatus(EUserStatus.ACTIVE);

                    Role role = roleRepository.findByName(ERole.USER);
                    user.setRoles(new HashSet<>(List.of(role)));

                    userRepository.save(user);
                }
            }

            List<String> roles = extractRoles(user.getAuthorities());
            String accessToken = jwtService.generateAccessToken(user.getUsername(), roles);
            String refreshToken = jwtService.generateRefreshToken(user.getUsername(), roles);

            tokenService.saveToken(user.getUsername(), refreshToken, httpServletRequest);

            return TokenResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .username(user.getUsername())
                    .build();

        } catch (Exception e) {
            log.error("Error during Google OAuth2 Nimbus verification: ", e);
            throw new InvalidDataException("Google authentication failed: " + e.getMessage());
        }
    }

    private User getUserFromResetPasswordToken(String token) {
        String username;
        try {
            username = jwtService.extractUsername(token, ETokenType.RESET_PASSWORD_TOKEN);
        } catch (JwtAuthenticationException e) {
            if (e.getErrorCode() == ErrorCode.TOKEN_EXPIRED) {
                throw new InvalidDataException("auth.reset_password_token_expired");
            }
            throw new InvalidDataException("auth.reset_password_token_invalid");
        }

        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("auth.account_not_found"));

        jwtService.isTokenValid(token, ETokenType.RESET_PASSWORD_TOKEN, user);
        return user;
    }
}
