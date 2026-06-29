package com.example.template.model;

import com.example.template.common.enums.EKycStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sellers")
public class Seller extends AbstractEntity<Long> {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "shop_name", nullable = false)
    private String shopName;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Column(name = "skills", length = 1000)
    private String skills;

    @Enumerated(EnumType.STRING)
    @Column(name = "kyc_status", nullable = false)
    private EKycStatus kycStatus = EKycStatus.PENDING;

    @Column(name = "document_url", length = 1000)
    private String documentUrl;
}
