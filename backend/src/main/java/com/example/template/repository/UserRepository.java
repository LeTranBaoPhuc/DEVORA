package com.example.template.repository;

import com.example.template.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = { "roles" })
    Optional<User> findByEmail(String email);

    Optional<User> findByGoogleId(String googleId);

    @EntityGraph(attributePaths = { "roles" })
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    Optional<User> findByPhone(String phone);

    boolean existsByPhone(String phone);

    Optional<User> findByVerificationCode(String verificationCode);

    Optional<User> findByEmailAndVerificationCode(String email, String verificationCode);

    @Query("""
        SELECT DISTINCT u
        FROM User u
        JOIN u.roles r
        WHERE r.name = com.example.template.common.enums.ERole.SELLER
          AND (:name IS NULL OR LOWER(u.username) LIKE LOWER(CONCAT('%', :name, '%')))
    """)
    Page<User> searchStaffByName(String name, Pageable pageable);

    @Query("""
        SELECT DISTINCT u
        FROM User u
        JOIN FETCH u.roles r
        WHERE r.name = com.example.template.common.enums.ERole.SELLER
    """)
    java.util.List<User> findAllStaffs();

    @Query("""
        SELECT DISTINCT u
        FROM User u
        JOIN FETCH u.roles r
        WHERE r.name = com.example.template.common.enums.ERole.USER
    """)
    java.util.List<User> findAllCustomers();
}
