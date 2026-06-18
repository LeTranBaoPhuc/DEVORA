package com.example.template.service.user;

import com.example.template.dto.request.ChangePasswordRequest;
import com.example.template.dto.response.ProfileResponse;
import com.example.template.dto.request.UpdateProfileRequest;
import com.example.template.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    void changePassword(ChangePasswordRequest request, String username);

    String updateAvatar(MultipartFile file, String name);

    ProfileResponse getProfile(String name);

    ProfileResponse getProfileByPhone(String phone);

    void updateProfile(UpdateProfileRequest request, String name);

    User getUserById(Long id);

    User getUserByUserName(String username);

    List<ProfileResponse> getAllCustomers();

    void sendEmailOtp(String username, String newEmail);

    void verifyEmailOtp(String username, String otp, String newEmail);
}
