package com.example.template.service.notification;

import com.example.template.dto.response.NotificationResponse;
import com.example.template.model.User;

import java.util.List;

public interface NotificationService {
    void sendNotification(User user, String title, String message, String actionUrl);
    List<NotificationResponse> getUserNotifications(Long userId);
    void markAsRead(Long notificationId, Long userId);
}
