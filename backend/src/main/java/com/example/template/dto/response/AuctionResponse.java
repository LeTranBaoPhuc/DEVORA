package com.example.template.dto.response;

import com.example.template.common.enums.EAuctionStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionResponse {
    private Long id;
    private Long buyerId;
    private String buyerUsername;
    private String buyerAvatarUrl;
    private Long categoryId;
    private String categoryName;
    private String title;
    private String slug;
    private String description;
    private BigDecimal budgetMin;
    private BigDecimal budgetMax;
    private LocalDateTime deadline;
    private List<String> skills;
    private List<String> preferredTechStack;
    private EAuctionStatus status;
    private LocalDateTime createdAt;
    private Integer bidsCount;
}
