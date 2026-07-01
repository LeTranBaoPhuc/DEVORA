-- Seed roles
INSERT INTO roles (name, description, created_at, updated_at)
VALUES ('ADMIN', 'Quản trị hệ thống', NOW(), NOW()),
       ('SELLER', 'Người bán hàng', NOW(), NOW()),
       ('USER', 'Người dùng', NOW(), NOW());

-- Seed users (Default password is '123456' for all seeded users)
-- Password bcrypt hash: $2a$10$s3go5e.GYivSMmrJXG6jceddjfSAbg6O832Sip8XIVNRRLIjXNP6G
INSERT INTO users (id, username, password, email, first_name, last_name, status, phone, created_at, updated_at)
VALUES
(1, 'admin', '$2a$10$s3go5e.GYivSMmrJXG6jceddjfSAbg6O832Sip8XIVNRRLIjXNP6G', 'admin@example.com', 'Admin', 'Template', 'ACTIVE', '0900000001', NOW(), NOW()),
(2, 'seller', '$2a$10$s3go5e.GYivSMmrJXG6jceddjfSAbg6O832Sip8XIVNRRLIjXNP6G', 'seller@example.com', 'Seller', 'Template', 'ACTIVE', '0900000002', NOW(), NOW()),
(3, 'user', '$2a$10$s3go5e.GYivSMmrJXG6jceddjfSAbg6O832Sip8XIVNRRLIjXNP6G', 'user@example.com', 'User', 'Template', 'ACTIVE', '0900000003', NOW(), NOW());

-- Map users to roles
-- Admin gets ADMIN (1), SELLER (2), and USER (3)
-- Seller gets SELLER (2) and USER (3)
-- User gets USER (3)
INSERT INTO user_roles (user_id, role_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 2),
       (2, 3),
       (3, 3);
