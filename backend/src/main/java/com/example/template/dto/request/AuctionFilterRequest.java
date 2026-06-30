package com.example.template.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionFilterRequest {
    private List<String> categories;
    private BigDecimal minBudget;
    private BigDecimal maxBudget;
    private String status;
    private String deadline;
    private String search;
    private int page = 1;
    private int size = 9;
    private String sortBy = "createdAt";
    private String sortDirection = "desc";
}
