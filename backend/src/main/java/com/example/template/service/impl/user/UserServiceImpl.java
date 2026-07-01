package com.example.template.service.impl.user;

import com.example.template.dto.request.ChangePasswordRequest;
import com.example.template.dto.request.UpdateProfileRequest;
import com.example.template.dto.response.ProfileResponse;
import com.example.template.exception.ResourceNotFoundException;
import com.example.template.exception.InvalidDataException;
import com.example.template.model.User;
import com.example.template.repository.UserRepository;
import com.example.template.service.cloudinary.CloudinaryService;
import com.example.template.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.template.service.mail.MailService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "USER-SERVICE")
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void changePassword(ChangePasswordRequest request, String username) {
        log.info("Processing for changing password for user {}", username);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("user.not_found"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new InvalidDataException("auth.bad_credentials");
        }

        if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            throw new InvalidDataException("auth.confirm_password_mismatch");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        log.info("Successfully changed password for user {}", username);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public String updateAvatar(MultipartFile file, String name) {
        log.info("Processing for updating avatar for user {}", name);

        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user"));

        String avatarUrl = cloudinaryService.uploadAvatar(file, user.getAvatarUrl());

        user.setAvatarUrl(avatarUrl);
        userRepository.save(user);
        log.info("Successfully updated avatar for user {}", name);

        return avatarUrl;
    }

    @Override
    public ProfileResponse getProfile(String name) {
        log.info("Processing for getting profile for user {}", name);

        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user"));

        ProfileResponse response = ProfileResponse.builder()
                .id(user.getId())
                .gender(user.getGender())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .dateOfBirth(user.getDateOfBirth())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRoles().stream()
                        .map(r -> r.getName().name())
                        .filter(roleName -> roleName.equals("ADMIN"))
                        .findFirst()
                        .orElse(user.getRoles().stream()
                                .map(r -> r.getName().name())
                                .filter(roleName -> roleName.equals("SELLER"))
                                .findFirst()
                                .orElse(user.getRoles().stream()
                                        .map(r -> r.getName().name())
                                        .findFirst()
                                        .orElse(null))))
                .createdAt(user.getCreatedAt().toLocalDate())
                .updatedAt(user.getUpdatedAt().toLocalDate())
                .build();

        log.info("Successfully retrieved profile for user {}", name);
        return response;
    }

    @Override
    public ProfileResponse getProfileByPhone(String phone) {
        log.info("Processing for getting profile for phone {}", phone);

        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khách hàng với SĐT này"));

        ProfileResponse response = ProfileResponse.builder()
                .id(user.getId())
                .gender(user.getGender())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .dateOfBirth(user.getDateOfBirth())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRoles().stream()
                        .map(r -> r.getName().name())
                        .filter(roleName -> roleName.equals("ADMIN"))
                        .findFirst()
                        .orElse(user.getRoles().stream()
                                .map(r -> r.getName().name())
                                .filter(roleName -> roleName.equals("SELLER"))
                                .findFirst()
                                .orElse(user.getRoles().stream()
                                        .map(r -> r.getName().name())
                                        .findFirst()
                                        .orElse(null))))
                .createdAt(user.getCreatedAt().toLocalDate())
                .updatedAt(user.getUpdatedAt().toLocalDate())
                .build();

        log.info("Successfully retrieved profile for phone {}", phone);
        return response;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateProfile(UpdateProfileRequest request, String name) {
        log.info("Processing for updating profile for user {}", name);

        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user"));

        user.setFirstName(request.getFirstName().trim().toUpperCase());
        user.setLastName(request.getLastName().trim().toUpperCase());
        user.setGender(request.getGender());
        user.setDateOfBirth(request.getDateOfBirth());
        userRepository.save(user);
        log.info("Successfully updated profile for user {}", name);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public User getUserByUserName(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public List<ProfileResponse> getAllCustomers() {
        return userRepository.findAllCustomers().stream()
                .map(user -> ProfileResponse.builder()
                        .id(user.getId())
                        .gender(user.getGender())
                        .username(user.getUsername())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .dateOfBirth(user.getDateOfBirth())
                        .avatarUrl(user.getAvatarUrl())
                        .role(user.getRoles().stream()
                                .map(r -> r.getName().name())
                                .filter(roleName -> roleName.equals("ADMIN"))
                                .findFirst()
                                .orElse(user.getRoles().stream()
                                        .map(r -> r.getName().name())
                                        .filter(roleName -> roleName.equals("SELLER"))
                                        .findFirst()
                                        .orElse(user.getRoles().stream()
                                                .map(r -> r.getName().name())
                                                .findFirst()
                                                .orElse(null))))
                        .createdAt(user.getCreatedAt().toLocalDate())
                        .updatedAt(user.getUpdatedAt().toLocalDate())
                        .build())
                .toList();
    }

    @Override
    public void sendEmailOtp(String username, String newEmail) {
        log.info("Generating email OTP for user: {}", username);

        if (userRepository.existsByEmail(newEmail)) {
            throw new InvalidDataException("auth.email_exists");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("user.not_found"));

        String otp = String.format("%06d", new Random().nextInt(1000000));

        user.setVerificationCode(otp);
        user.setVerificationExpiration(java.time.LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        mailService.sendOtpEmail(user.getEmail(), otp);
        log.info("Email OTP sent successfully to current email of user: {}", username);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void verifyEmailOtp(String username, String otp, String newEmail) {
        log.info("Verifying email OTP for user: {}", username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("user.not_found"));

        if (user.getVerificationCode() == null || !user.getVerificationCode().equals(otp)) {
            throw new InvalidDataException("auth.verify_code_invalid");
        }

        if (user.getVerificationExpiration().isBefore(java.time.LocalDateTime.now())) {
            throw new InvalidDataException("auth.verify_code_expired");
        }

        if (userRepository.existsByEmail(newEmail)) {
            throw new InvalidDataException("auth.email_exists");
        }

        user.setEmail(newEmail);
        user.setVerificationCode(null);
        user.setVerificationExpiration(null);
        userRepository.save(user);

        log.info("Email updated successfully for user: {}", username);
    }
}
