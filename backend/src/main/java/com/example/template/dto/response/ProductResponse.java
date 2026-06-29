package com.example.template.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private String id;
    private String slug;
    private String title;
    private String coverImage;
    private BigDecimal price;
    private BigDecimal rating;
    private Integer salesCount;
    private String productType;
    private List<String> techStack;
    private SellerDto seller;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SellerDto {
        private String username;
        private String avatar;
        private boolean isVerified;
    }
}
