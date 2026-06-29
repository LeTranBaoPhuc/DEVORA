package com.example.template.controller;

import com.example.template.dto.request.ProductFilterRequest;
import com.example.template.dto.response.ApiResponse;
import com.example.template.dto.response.PageResponse;
import com.example.template.dto.response.ProductResponse;
import com.example.template.service.marketplace.MarketplaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/marketplace")
@RequiredArgsConstructor
public class MarketplaceController {

    private final MarketplaceService marketplaceService;

    @GetMapping("/products")
    public ResponseEntity<ApiResponse> getProducts(@ModelAttribute ProductFilterRequest filterRequest) {
        PageResponse<ProductResponse> products = marketplaceService.getProducts(filterRequest);
        return ResponseEntity.ok(ApiResponse.builder()
                .status(200)
                .message("Success")
                .data(products)
                .build());
    }
}
