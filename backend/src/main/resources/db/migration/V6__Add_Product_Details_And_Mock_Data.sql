-- Add new columns to products table
ALTER TABLE products
ADD COLUMN rating DECIMAL(3, 2) DEFAULT 0.0,
ADD COLUMN sales_count INT DEFAULT 0,
ADD COLUMN product_type VARCHAR(100),
ADD COLUMN tech_stack JSON;

-- Insert Mock Users
INSERT INTO users (id, username, password, email, first_name, last_name, status, avatar_url, created_at, updated_at) VALUES
(10, 'AppMaster', '$2a$10$s3go5e.GYivSMmrJXG6jceddjfSAbg6O832Sip8XIVNRRLIjXNP6G', 'appmaster@mock.com', 'App', 'Master', 'ACTIVE', 'https://i.pravatar.cc/150?u=a042581f4e29026704d', NOW(), NOW()),
(11, 'WebNinja', '$2a$10$s3go5e.GYivSMmrJXG6jceddjfSAbg6O832Sip8XIVNRRLIjXNP6G', 'webninja@mock.com', 'Web', 'Ninja', 'ACTIVE', 'https://i.pravatar.cc/150?u=a042581f4e29026704e', NOW(), NOW()),
(12, 'CodeCrafter', '$2a$10$s3go5e.GYivSMmrJXG6jceddjfSAbg6O832Sip8XIVNRRLIjXNP6G', 'codecrafter@mock.com', 'Code', 'Crafter', 'ACTIVE', 'https://i.pravatar.cc/150?u=a042581f4e29026704f', NOW(), NOW()),
(13, 'FitDevs', '$2a$10$s3go5e.GYivSMmrJXG6jceddjfSAbg6O832Sip8XIVNRRLIjXNP6G', 'fitdevs@mock.com', 'Fit', 'Devs', 'ACTIVE', 'https://i.pravatar.cc/150?u=a042581f4e29026704g', NOW(), NOW()),
(14, 'PropertyTech', '$2a$10$s3go5e.GYivSMmrJXG6jceddjfSAbg6O832Sip8XIVNRRLIjXNP6G', 'propertytech@mock.com', 'Property', 'Tech', 'ACTIVE', 'https://i.pravatar.cc/150?u=a042581f4e29026704h', NOW(), NOW()),
(15, 'EatsApp', '$2a$10$s3go5e.GYivSMmrJXG6jceddjfSAbg6O832Sip8XIVNRRLIjXNP6G', 'eatsapp@mock.com', 'Eats', 'App', 'ACTIVE', 'https://i.pravatar.cc/150?u=a042581f4e29026704i', NOW(), NOW()),
(16, 'HireDev', '$2a$10$s3go5e.GYivSMmrJXG6jceddjfSAbg6O832Sip8XIVNRRLIjXNP6G', 'hiredev@mock.com', 'Hire', 'Dev', 'ACTIVE', 'https://i.pravatar.cc/150?u=a042581f4e29026704j', NOW(), NOW()),
(17, 'UIUX_Master', '$2a$10$s3go5e.GYivSMmrJXG6jceddjfSAbg6O832Sip8XIVNRRLIjXNP6G', 'uiuxmaster@mock.com', 'UIUX', 'Master', 'ACTIVE', 'https://i.pravatar.cc/150?u=a042581f4e29026704k', NOW(), NOW());

-- Insert Mock Sellers
INSERT INTO sellers (id, user_id, shop_name, kyc_status, created_at, updated_at) VALUES
(10, 10, 'AppMaster Shop', 'APPROVED', NOW(), NOW()),
(11, 11, 'WebNinja Store', 'PENDING', NOW(), NOW()),
(12, 12, 'CodeCrafter Hub', 'APPROVED', NOW(), NOW()),
(13, 13, 'FitDevs Studio', 'APPROVED', NOW(), NOW()),
(14, 14, 'PropertyTech Labs', 'PENDING', NOW(), NOW()),
(15, 15, 'EatsApp Team', 'APPROVED', NOW(), NOW()),
(16, 16, 'HireDev Agency', 'APPROVED', NOW(), NOW()),
(17, 17, 'UIUX_Master Designs', 'PENDING', NOW(), NOW());

-- Insert Mock Categories
INSERT INTO categories (id, name, slug, description, created_at, updated_at) VALUES
(10, 'Mobile App', 'mobile-app', 'Mobile Application Source Codes', NOW(), NOW()),
(11, 'Web App', 'web-app', 'Web Application Source Codes', NOW(), NOW()),
(12, 'Website', 'website', 'Website Templates', NOW(), NOW());

-- Insert Mock Products
INSERT INTO products (id, seller_id, category_id, title, slug, price, status, cover_image, rating, sales_count, product_type, tech_stack, created_at, updated_at) VALUES
(10, 10, 10, 'E-commerce Mobile App Full Source Code', 'ecommerce-mobile-app', 299.00, 'ACTIVE', 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=600', 4.9, 342, 'Mobile App', '["React Native", "Firebase", "Stripe"]', NOW(), NOW()),
(11, 11, 11, 'Modern SaaS Dashboard & Landing Page', 'saas-dashboard-nextjs', 149.99, 'ACTIVE', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', 4.7, 1205, 'Web App', '["Next.js", "Tailwind CSS", "Supabase"]', NOW(), NOW()),
(12, 12, 11, 'Social Media Management Platform', 'social-media-management', 499.00, 'ACTIVE', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600', 4.8, 89, 'Web App', '["MERN Stack", "Socket.io", "AWS"]', NOW(), NOW()),
(13, 13, 10, 'Pro Fitness & Workout Tracking App', 'fitness-tracking-app', 199.00, 'ACTIVE', 'https://images.unsplash.com/photo-1526506114642-990520a2e053?auto=format&fit=crop&q=80&w=600', 4.6, 2341, 'Mobile App', '["Flutter", "Dart", "Firebase"]', NOW(), NOW()),
(14, 14, 11, 'Premium Real Estate Listing Portal', 'real-estate-portal', 345.00, 'ACTIVE', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600', 4.9, 672, 'Web App', '["Vue.js", "Laravel", "MySQL"]', NOW(), NOW()),
(15, 15, 10, 'Complete Food Delivery App Solution', 'food-delivery-kit', 599.00, 'ACTIVE', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600', 4.5, 42, 'Mobile App', '["Swift", "Kotlin", "Node.js"]', NOW(), NOW()),
(16, 16, 11, 'Niche Job Board & Recruitment Platform', 'job-board-platform', 250.00, 'ACTIVE', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600', 4.8, 512, 'Web App', '["Django", "React", "PostgreSQL"]', NOW(), NOW()),
(17, 17, 12, 'Creative Developer Portfolio Template', 'portfolio-template-pro', 49.00, 'ACTIVE', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600', 4.4, 890, 'Website', '["HTML", "CSS", "JavaScript", "GSAP"]', NOW(), NOW());
