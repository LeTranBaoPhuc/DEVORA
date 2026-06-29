package com.example.template.repository.specification;

import com.example.template.common.enums.EProductStatus;
import com.example.template.dto.request.ProductFilterRequest;
import com.example.template.model.Category;
import com.example.template.model.Product;
import com.example.template.model.Seller;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> filter(ProductFilterRequest request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. Only ACTIVE products
            predicates.add(cb.equal(root.get("status"), EProductStatus.ACTIVE));

            // 2. Search by title or description
            if (StringUtils.hasText(request.getSearch())) {
                String searchPattern = "%" + request.getSearch().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("title")), searchPattern),
                        cb.like(cb.lower(root.get("description")), searchPattern)
                ));
            }

            // 3. Filter by multiple Categories (by slug)
            if (!CollectionUtils.isEmpty(request.getCategories())) {
                Join<Product, Category> categoryJoin = root.join("category", JoinType.INNER);
                predicates.add(categoryJoin.get("slug").in(request.getCategories()));
            }

            // 4. Min Price
            if (request.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), request.getMinPrice()));
            }

            // 5. Max Price
            if (request.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), request.getMaxPrice()));
            }

            // 6. Product Types
            if (!CollectionUtils.isEmpty(request.getProductTypes())) {
                predicates.add(root.get("productType").in(request.getProductTypes()));
            }

            // 7. Tech Stacks (JSON array simulation using LIKE)
            if (!CollectionUtils.isEmpty(request.getTechStacks())) {
                List<Predicate> techStackPredicates = new ArrayList<>();
                for (String techStack : request.getTechStacks()) {
                    // For a JSON array like ["React", "Node.js"], we can do a LIKE '%"React"%'
                    String techPattern = "%\"" + techStack + "\"%";
                    techStackPredicates.add(cb.like(root.get("techStack"), techPattern));
                }
                // They must match ANY of the selected tech stacks (OR logic)
                predicates.add(cb.or(techStackPredicates.toArray(new Predicate[0])));
            }

            // 8. Min Rating
            if (request.getMinRating() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("rating"), request.getMinRating()));
            }

            // 9. Verified Seller
            if (Boolean.TRUE.equals(request.getVerifiedSeller())) {
                Join<Product, Seller> sellerJoin = root.join("seller", JoinType.INNER);
                predicates.add(cb.isTrue(sellerJoin.get("verified")));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
