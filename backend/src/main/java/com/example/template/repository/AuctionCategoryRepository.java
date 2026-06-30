package com.example.template.repository;

import com.example.template.model.AuctionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuctionCategoryRepository extends JpaRepository<AuctionCategory, Long> {
    Optional<AuctionCategory> findBySlug(String slug);
}
