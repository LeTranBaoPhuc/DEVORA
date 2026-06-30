package com.example.template.model;

import com.example.template.common.enums.EAuctionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "auctions")
public class Auction extends AbstractEntity<Long> {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private AuctionCategory category;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "slug", unique = true, nullable = false)
    private String slug;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "budget_min", nullable = false, precision = 10, scale = 2)
    private BigDecimal budgetMin;

    @Column(name = "budget_max", nullable = false, precision = 10, scale = 2)
    private BigDecimal budgetMax;

    @Column(name = "deadline", nullable = false)
    private LocalDateTime deadline;

    @Column(name = "skills", columnDefinition = "JSON")
    private String skills;

    @Column(name = "preferred_tech_stack", columnDefinition = "JSON")
    private String preferredTechStack;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private EAuctionStatus status = EAuctionStatus.OPEN;
}
