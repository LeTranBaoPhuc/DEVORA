package com.example.template.service.impl.marketplace;

import com.example.template.common.enums.EKycStatus;
import com.example.template.dto.request.ProductFilterRequest;
import com.example.template.dto.response.PageResponse;
import com.example.template.dto.response.ProductResponse;
import com.example.template.model.Product;
import com.example.template.repository.ProductRepository;
import com.example.template.service.marketplace.MarketplaceService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MarketplaceServiceImpl implements MarketplaceService {

    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper;

    @Override
    public PageResponse<ProductResponse> getProducts(ProductFilterRequest filterRequest) {
        Sort sort = switch (filterRequest.getSort() != null ? filterRequest.getSort() : "newest") {
            case "price-asc" -> Sort.by(Sort.Direction.ASC, "price");
            case "price-desc" -> Sort.by(Sort.Direction.DESC, "price");
            case "top-rated" -> Sort.by(Sort.Direction.DESC, "rating");
            case "best-selling" -> Sort.by(Sort.Direction.DESC, "salesCount");
            default -> Sort.by(Sort.Direction.DESC, "createdAt");
        };

        Pageable pageable = PageRequest.of(filterRequest.getPage() - 1, filterRequest.getSize(), sort);

        Page<Product> products = productRepository.findAll(
                com.example.template.repository.specification.ProductSpecification.filter(filterRequest),
                pageable
        );

        List<ProductResponse> productResponses = products.getContent().stream()
                .map(this::mapToProductResponse)
                .toList();

        return PageResponse.<ProductResponse>builder()
                .page(products.getNumber() + 1)
                .pageSize(products.getSize())
                .totalPages(products.getTotalPages())
                .totalItems(products.getTotalElements())
                .data(productResponses)
                .build();
    }

    private ProductResponse mapToProductResponse(Product product) {
        List<String> techStackList = new ArrayList<>();
        if (StringUtils.hasText(product.getTechStack())) {
            try {
                techStackList = objectMapper.readValue(product.getTechStack(), new TypeReference<List<String>>() {});
            } catch (JsonProcessingException e) {
                log.error("Failed to parse tech stack for product {}: {}", product.getId(), e.getMessage());
            }
        }

        ProductResponse.SellerDto sellerDto = ProductResponse.SellerDto.builder()
                .username(product.getSeller().getUser().getUsername())
                .avatar(product.getSeller().getUser().getAvatarUrl())
                .isVerified(product.getSeller().getKycStatus() == EKycStatus.APPROVED)
                .build();

        return ProductResponse.builder()
                .id(String.valueOf(product.getId()))
                .slug(product.getSlug())
                .title(product.getTitle())
                .coverImage(product.getCoverImage())
                .price(product.getPrice())
                .rating(product.getRating())
                .salesCount(product.getSalesCount())
                .productType(product.getProductType())
                .techStack(techStackList)
                .seller(sellerDto)
                .build();
    }
}
