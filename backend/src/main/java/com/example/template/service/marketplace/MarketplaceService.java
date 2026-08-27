package com.example.template.service.marketplace;

import com.example.template.dto.request.ProductFilterRequest;
import com.example.template.dto.response.PageResponse;
import com.example.template.dto.response.ProductResponse;

public interface MarketplaceService {
    PageResponse<ProductResponse> getProducts(ProductFilterRequest filterRequest);
    ProductResponse getProductBySlug(String slug);
}
