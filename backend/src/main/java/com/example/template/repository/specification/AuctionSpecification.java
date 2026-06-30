package com.example.template.repository.specification;

import com.example.template.model.Auction;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class AuctionSpecification {

    public static Specification<Auction> filterBy(List<String> categories,
                                                  BigDecimal minBudget,
                                                  BigDecimal maxBudget,
                                                  String status,
                                                  String deadline,
                                                  String search) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (categories != null && !categories.isEmpty()) {
                predicates.add(root.join("category").get("slug").in(categories));
            }

            if (minBudget != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("budgetMin"), minBudget));
            }

            if (maxBudget != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("budgetMax"), maxBudget));
            }

            if (status != null && !status.isEmpty() && !status.equals("all")) {
                predicates.add(criteriaBuilder.equal(root.get("status"), status.toUpperCase()));
            }

            if (search != null && !search.isEmpty()) {
                String searchPattern = "%" + search.toLowerCase() + "%";
                Predicate titlePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), searchPattern);
                Predicate descPredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), searchPattern);
                predicates.add(criteriaBuilder.or(titlePredicate, descPredicate));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
