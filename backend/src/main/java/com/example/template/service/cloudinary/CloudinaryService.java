package com.example.template.service.cloudinary;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {
    String uploadAvatar(MultipartFile file, String oldAvatarUrl);
}
