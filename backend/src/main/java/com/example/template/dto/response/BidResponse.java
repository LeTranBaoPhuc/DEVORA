package com.example.template.dto.response;

import com.example.template.common.enums.EBidStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BidResponse {
    private Long id;
    private Long auctionId;
    private Long bidderId;
    private String bidderUsername;
    private String bidderAvatarUrl;
    private BigDecimal price;
    private Integer deliveryDays;
    private String coverLetter;
    private EBidStatus status;
    private LocalDateTime createdAt;
}
