package com.example.template.dto.response;

import java.time.LocalDate;

import com.example.template.common.enums.EGender;
import com.example.template.common.enums.EUserStatus;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProfileResponse {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String avatarUrl;
    private String role;
    private EGender gender;
    @com.fasterxml.jackson.annotation.JsonFormat(shape = com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dateOfBirth;
    private EUserStatus status;
    private LocalDate createdAt;
    private LocalDate updatedAt;
}
