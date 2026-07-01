package com.example.template.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class NotificationResponse {
    private Long id;
    private String title;
    private String message;
    private String actionUrl;
    
    @JsonProperty("isRead")
    private boolean isRead;
    private LocalDateTime createdAt;
}
