package com.example.template.service.mail;

import java.util.Map;

public interface MailService {
    void sendConfirmLink(String emailTo, String template, String endPointConfirmUser, String verifyCode);

    void sendResetPasswordLink(String emailTo, String resetPasswordEndpoint, String resetPasswordToken);

    void sendOtpEmail(String emailTo, String otp);
}
