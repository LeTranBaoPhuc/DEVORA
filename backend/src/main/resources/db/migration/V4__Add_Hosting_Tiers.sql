-- Add hosting tiers to products
ALTER TABLE `products`
ADD COLUMN `has_managed_hosting` bit(1) NOT NULL DEFAULT b'0',
ADD COLUMN `hosting_price_monthly` decimal(10,2) DEFAULT NULL,
ADD COLUMN `hosting_price_yearly` decimal(10,2) DEFAULT NULL;

-- Update orders table to support order types and recurring hosting status
ALTER TABLE `orders`
ADD COLUMN `order_type` enum('SOURCE_ONLY','MANAGED_HOSTING') NOT NULL DEFAULT 'SOURCE_ONLY',
ADD COLUMN `hosting_expires_at` datetime(6) DEFAULT NULL,
ADD COLUMN `hosting_status` enum('ACTIVE','EXPIRED','CANCELLED') DEFAULT NULL;

-- Create subscriptions/renewals log table to track payments for hosting
CREATE TABLE `hosting_renewals` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `created_at` datetime(6) DEFAULT NULL,
    `updated_at` datetime(6) DEFAULT NULL,
    `order_id` bigint NOT NULL,
    `amount_paid` decimal(10,2) NOT NULL,
    `renewal_period` enum('MONTHLY','YEARLY') NOT NULL,
    `period_start` datetime(6) NOT NULL,
    `period_end` datetime(6) NOT NULL,
    `created_by` varchar(255) DEFAULT NULL,
    `updated_by` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_renewals_order_id_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
