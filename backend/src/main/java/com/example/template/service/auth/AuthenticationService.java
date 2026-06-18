package com.example.template.service.auth;

import com.example.template.dto.request.ForgotPasswordRequest;
import com.example.template.dto.request.LoginRequest;
import com.example.template.dto.request.RegisterRequest;
import com.example.template.dto.request.ResetPasswordRequest;
import com.example.template.dto.response.TokenResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthenticationService {
    TokenResponse accessToken(LoginRequest request, HttpServletRequest httpServletRequest);

    TokenResponse refreshToken(HttpServletRequest request);

    void logout(HttpServletRequest request);

    Long register(RegisterRequest request);

    void forgotPassword(ForgotPasswordRequest request);

    boolean confirmRegister(String verifyCode);

    void verifyResetPasswordToken(String token);

    TokenResponse googleLogin(com.example.template.dto.request.GoogleLoginRequest request, HttpServletRequest httpServletRequest);

    void resetPassword(String token, ResetPasswordRequest request);
}
