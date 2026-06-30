package com.example.template.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BidRequest {
    private Long auctionId;
    private BigDecimal price;
    private Integer deliveryDays;
    private String coverLetter;
}
