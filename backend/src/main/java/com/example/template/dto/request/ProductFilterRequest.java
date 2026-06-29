package com.example.template.dto.request;

import lombok.Data;
import java.util.List;
import java.math.BigDecimal;

@Data
public class ProductFilterRequest {
    private String search;
    private List<String> categories;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private List<String> productTypes;
    private List<String> techStacks;
    private Integer minRating;
    private Boolean verifiedSeller;
    private String sort = "newest";
    private int page = 1;
    private int size = 9;
}
