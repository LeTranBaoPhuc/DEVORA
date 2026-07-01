package com.example.template.service.impl.notification;

import com.example.template.dto.response.NotificationResponse;
import com.example.template.exception.ResourceNotFoundException;
import com.example.template.model.Notification;
import com.example.template.model.User;
import com.example.template.repository.NotificationRepository;
import com.example.template.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "NOTIFICATION-SERVICE")
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    @Transactional
    public void sendNotification(User user, String title, String message, String actionUrl) {
        log.info("Sending notification to user {}: {}", user.getUsername(), title);
        
        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .actionUrl(actionUrl)
                .isRead(false)
                .build();
                
        notification = notificationRepository.save(notification);
        
        NotificationResponse response = NotificationResponse.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .actionUrl(notification.getActionUrl())
                .isRead(notification.isRead())
                .createdAt(notification.getCreatedAt())
                .build();
                
        messagingTemplate.convertAndSend(
                "/topic/notifications-" + user.getId(),
                response
        );
    }

    @Override
    public List<NotificationResponse> getUserNotifications(Long userId) {
        return notificationRepository.findAllByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(notification -> NotificationResponse.builder()
                        .id(notification.getId())
                        .title(notification.getTitle())
                        .message(notification.getMessage())
                        .actionUrl(notification.getActionUrl())
                        .isRead(notification.isRead())
                        .createdAt(notification.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void markAsRead(Long notificationId, Long userId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
                
        if (!notification.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Notification not found for this user");
        }
        
        notification.setRead(true);
        notificationRepository.save(notification);
    }
}
