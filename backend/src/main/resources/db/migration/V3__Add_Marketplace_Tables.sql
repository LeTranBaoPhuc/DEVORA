-- sellers definition
CREATE TABLE `sellers` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `created_at` datetime(6) DEFAULT NULL,
    `updated_at` datetime(6) DEFAULT NULL,
    `user_id` bigint NOT NULL,
    `shop_name` varchar(255) NOT NULL,
    `bio` text,
    `skills` varchar(1000) DEFAULT NULL,
    `kyc_status` enum('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
    `document_url` varchar(1000) DEFAULT NULL,
    `created_by` varchar(255) DEFAULT NULL,
    `updated_by` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `uk_sellers_user_id` UNIQUE (`user_id`),
    CONSTRAINT `fk_sellers_user_id_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- categories definition
CREATE TABLE `categories` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `created_at` datetime(6) DEFAULT NULL,
    `updated_at` datetime(6) DEFAULT NULL,
    `name` varchar(255) NOT NULL,
    `slug` varchar(255) NOT NULL,
    `description` text,
    `created_by` varchar(255) DEFAULT NULL,
    `updated_by` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `uk_categories_slug` UNIQUE (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- products definition
CREATE TABLE `products` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `created_at` datetime(6) DEFAULT NULL,
    `updated_at` datetime(6) DEFAULT NULL,
    `seller_id` bigint NOT NULL,
    `category_id` bigint NOT NULL,
    `title` varchar(255) NOT NULL,
    `slug` varchar(255) NOT NULL,
    `description` text,
    `price` decimal(10,2) NOT NULL,
    `status` enum('DRAFT','ACTIVE','HIDDEN') NOT NULL DEFAULT 'DRAFT',
    `cover_image` varchar(1000) DEFAULT NULL,
    `created_by` varchar(255) DEFAULT NULL,
    `updated_by` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `uk_products_slug` UNIQUE (`slug`),
    CONSTRAINT `fk_products_seller_id_sellers` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`),
    CONSTRAINT `fk_products_category_id_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- orders definition
CREATE TABLE `orders` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `created_at` datetime(6) DEFAULT NULL,
    `updated_at` datetime(6) DEFAULT NULL,
    `buyer_id` bigint NOT NULL,
    `seller_id` bigint NOT NULL,
    `product_id` bigint NOT NULL,
    `amount` decimal(10,2) NOT NULL,
    `status` enum('PENDING','IN_ESCROW','DELIVERING','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PENDING',
    `created_by` varchar(255) DEFAULT NULL,
    `updated_by` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_orders_buyer_id_users` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`),
    CONSTRAINT `fk_orders_seller_id_sellers` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`),
    CONSTRAINT `fk_orders_product_id_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- auctions definition
CREATE TABLE `auctions` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `created_at` datetime(6) DEFAULT NULL,
    `updated_at` datetime(6) DEFAULT NULL,
    `buyer_id` bigint NOT NULL,
    `title` varchar(255) NOT NULL,
    `description` text NOT NULL,
    `budget_min` decimal(10,2) DEFAULT NULL,
    `budget_max` decimal(10,2) DEFAULT NULL,
    `deadline_days` int DEFAULT NULL,
    `status` enum('OPEN','IN_PROGRESS','COMPLETED','CANCELLED') NOT NULL DEFAULT 'OPEN',
    `created_by` varchar(255) DEFAULT NULL,
    `updated_by` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_auctions_buyer_id_users` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- auction_bids definition
CREATE TABLE `auction_bids` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `created_at` datetime(6) DEFAULT NULL,
    `updated_at` datetime(6) DEFAULT NULL,
    `auction_id` bigint NOT NULL,
    `seller_id` bigint NOT NULL,
    `amount` decimal(10,2) NOT NULL,
    `message` text,
    `status` enum('PENDING','ACCEPTED','REJECTED') NOT NULL DEFAULT 'PENDING',
    `created_by` varchar(255) DEFAULT NULL,
    `updated_by` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_bids_auction_id_auctions` FOREIGN KEY (`auction_id`) REFERENCES `auctions` (`id`),
    CONSTRAINT `fk_bids_seller_id_sellers` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
