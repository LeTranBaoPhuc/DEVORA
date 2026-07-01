package com.example.template.controller;

import com.example.template.dto.response.ApiResponse;
import com.example.template.dto.response.NotificationResponse;
import com.example.template.model.User;
import com.example.template.repository.UserRepository;
import com.example.template.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class ApiNotificationController {

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<ApiResponse> getUserNotifications(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        List<NotificationResponse> notifications = notificationService.getUserNotifications(user.getId());
        
        return ResponseEntity.ok(ApiResponse.builder()
                .status(200)
                .message("Notifications retrieved successfully")
                .data(notifications)
                .build());
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse> markAsRead(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        notificationService.markAsRead(id, user.getId());
        
        return ResponseEntity.ok(ApiResponse.builder()
                .status(200)
                .message("Notification marked as read")
                .build());
    }

    @PostMapping("/test")
    public ResponseEntity<ApiResponse> testNotification(
            @RequestBody Map<String, String> request,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        notificationService.sendNotification(user, request.get("title"), request.get("message"), "/");
        
        return ResponseEntity.ok(ApiResponse.builder()
                .status(200)
                .message("Test notification sent")
                .build());
    }
}
