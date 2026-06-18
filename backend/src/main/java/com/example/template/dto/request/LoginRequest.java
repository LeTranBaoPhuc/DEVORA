package com.example.template.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String username;
    private String email;
    
    @NotBlank(message = "{validation.login.password.not_blank}")
    private String password;
}
