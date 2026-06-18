-- roles definition
CREATE TABLE `roles` (
    `created_at` datetime(6) DEFAULT NULL,
    `id` bigint NOT NULL AUTO_INCREMENT,
    `updated_at` datetime(6) DEFAULT NULL,
    `description` varchar(500) DEFAULT NULL,
    `name` enum('ADMIN','STAFF','USER') NOT NULL,
    `created_by` varchar(255) DEFAULT NULL,
    `updated_by` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `uk_roles_name` UNIQUE (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- users definition
CREATE TABLE `users` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `created_at` datetime(6) DEFAULT NULL,
    `updated_at` datetime(6) DEFAULT NULL,
    `username` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `first_name` varchar(50) NOT NULL,
    `last_name` varchar(50) NOT NULL,
    `phone` varchar(11) DEFAULT NULL,
    `avatar_url` varchar(200) DEFAULT NULL,
    `date_of_birth` date DEFAULT NULL,
    `gender` enum('FEMALE','MALE','OTHER') DEFAULT NULL,
    `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'INACTIVE',
    `google_id` varchar(255) DEFAULT NULL,
    `verification_code` varchar(255) DEFAULT NULL,
    `verification_expiration` datetime(6) DEFAULT NULL,
    `created_by` varchar(255) DEFAULT NULL,
    `updated_by` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `uk_users_username` UNIQUE (`username`),
    CONSTRAINT `uk_users_email` UNIQUE (`email`),
    CONSTRAINT `uk_users_phone` UNIQUE (`phone`),
    CONSTRAINT `uk_users_google_id` UNIQUE (`google_id`),
    KEY `idx_users_avatar_url` (`avatar_url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- user_roles definition
CREATE TABLE `user_roles` (
    `role_id` bigint NOT NULL,
    `user_id` bigint NOT NULL,
    CONSTRAINT `pk_user_roles` PRIMARY KEY (`role_id`,`user_id`),
    KEY `idx_user_roles_user_id` (`user_id`),
    CONSTRAINT `fk_user_roles_role_id_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
    CONSTRAINT `fk_user_roles_user_id_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- tokens definition
CREATE TABLE `tokens` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `created_at` datetime(6) DEFAULT NULL,
    `updated_at` datetime(6) DEFAULT NULL,
    `username` varchar(255) NOT NULL,
    `token` text,
    `refresh_token` varchar(1000) DEFAULT NULL,
    `device` varchar(1000) DEFAULT NULL,
    `ip_address` varchar(45) DEFAULT NULL,
    `is_revoked` bit(1) DEFAULT NULL,
    `expired_at` datetime(6) DEFAULT NULL,
    `created_by` varchar(255) DEFAULT NULL,
    `updated_by` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
