package com.example.template.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {
    @NotBlank(message = "{validation.reset_password.password.not_blank}")
    private String password;

    @NotBlank(message = "{validation.reset_password.confirm_password.not_blank}")
    private String confirmPassword;
}
