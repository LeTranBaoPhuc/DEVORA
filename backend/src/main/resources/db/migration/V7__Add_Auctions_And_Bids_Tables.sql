-- 1. Create Auction Categories Table
CREATE TABLE auction_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

-- Insert Mock Auction Categories
INSERT INTO auction_categories (id, name, slug, description, created_at, updated_at) VALUES
(1, 'Web Apps', 'web-apps', 'Custom web applications and platforms', NOW(), NOW()),
(2, 'Mobile Apps', 'mobile-apps', 'iOS and Android applications', NOW(), NOW()),
(3, 'AI Agents', 'ai-agents', 'Artificial intelligence and machine learning models', NOW(), NOW()),
(4, 'Automation Scripts', 'automation-scripts', 'Scripts for automating repetitive tasks', NOW(), NOW()),
(5, 'Chatbots', 'chatbots', 'Discord, Telegram, and customer service bots', NOW(), NOW()),
(6, 'Mini Apps', 'mini-apps', 'Telegram mini apps and small widgets', NOW(), NOW());

-- 2. Alter Auctions Table
ALTER TABLE auctions 
ADD COLUMN category_id BIGINT AFTER buyer_id,
ADD COLUMN slug VARCHAR(255) AFTER title,
ADD COLUMN deadline DATETIME(6) AFTER budget_max,
ADD COLUMN skills JSON AFTER deadline,
ADD COLUMN preferred_tech_stack JSON AFTER skills,
DROP COLUMN deadline_days;

-- Assuming table is empty, but just in case, update slug to a dummy value so we can add UNIQUE
UPDATE auctions SET slug = CONCAT('auction-', id) WHERE slug IS NULL;

-- Now modify to add constraints
ALTER TABLE auctions 
ADD CONSTRAINT uk_auctions_slug UNIQUE (slug),
ADD CONSTRAINT fk_auctions_category FOREIGN KEY (category_id) REFERENCES auction_categories(id);

-- 3. Alter Bids Table (Rename from auction_bids)
RENAME TABLE auction_bids TO bids;

ALTER TABLE bids
CHANGE COLUMN seller_id bidder_id BIGINT NOT NULL,
CHANGE COLUMN amount price DECIMAL(10, 2) NOT NULL,
CHANGE COLUMN message cover_letter TEXT,
ADD COLUMN delivery_days INT NOT NULL DEFAULT 7 AFTER price;

-- Insert Mock Auctions
INSERT INTO auctions (id, buyer_id, category_id, title, slug, description, budget_min, budget_max, deadline, skills, preferred_tech_stack, status, created_at, updated_at) VALUES
(1, 10, 5, 'Need a custom Discord bot that bridges our Patreon API to assign roles', 'need-a-custom-discord-bot-that-bridges-our-patreon-api', 'We run a large Discord community for vibe coders and we use Patreon for memberships. We need a Discord bot that can:\n\n1. Connect to our Patreon API.\n2. Automatically assign Discord roles based on active Patreon tiers.\n3. Remove roles if a pledge is cancelled or declined.\n4. Provide a command for users to manually link/sync their accounts if they joined Discord late.\n\nWe need this built in Node.js using Discord.js. It needs to be well-documented so we can host it ourselves on a VPS.', 300.00, 500.00, DATE_ADD(NOW(), INTERVAL 2 DAY), JSON_ARRAY('Discord.js', 'Patreon API', 'Node.js', 'MongoDB'), JSON_ARRAY('TypeScript', 'Docker'), 'OPEN', NOW(), NOW()),
(2, 11, 4, 'Scrape product catalog from competitor website daily into Airtable', 'scrape-product-catalog-from-competitor', 'I need a daily cron job that scrapes prices and stock info from a competitor website and pushes it into our Airtable base.', 150.00, 250.00, DATE_ADD(NOW(), INTERVAL 5 HOUR), JSON_ARRAY('Python', 'BeautifulSoup', 'Airtable API'), JSON_ARRAY('Python 3.10'), 'OPEN', NOW(), NOW()),
(3, 12, 3, 'AI Agent that can read PDFs and answer questions based on the content via WhatsApp', 'ai-agent-that-can-read-pdfs', 'Looking for an AI developer to build an agent that we can connect to Twilio WhatsApp. Users should be able to upload a PDF and chat with it.', 800.00, 1200.00, DATE_ADD(NOW(), INTERVAL 7 DAY), JSON_ARRAY('LangChain', 'OpenAI', 'Twilio API', 'Vector DB'), JSON_ARRAY('Pinecone', 'Node.js'), 'OPEN', NOW(), NOW()),
(4, 13, 6, 'Figma plugin to export styles directly to Tailwind v4 theme CSS variables', 'figma-plugin-to-export-styles', 'We need a Figma plugin for our design system that can generate a valid tailwind v4 CSS file based on our local variables.', 400.00, 800.00, DATE_SUB(NOW(), INTERVAL 2 DAY), JSON_ARRAY('TypeScript', 'Figma Plugin API', 'TailwindCSS'), JSON_ARRAY('React'), 'IN_PROGRESS', NOW(), NOW());

-- Insert Mock Bids
INSERT INTO bids (id, auction_id, bidder_id, price, delivery_days, cover_letter, status, created_at, updated_at) VALUES
(1, 1, 14, 350.00, 5, 'I have built over 20 Discord bots, including 3 that specifically integrate with Patreon. I can use TypeScript and provide a Dockerfile for easy VPS deployment.', 'PENDING', DATE_SUB(NOW(), INTERVAL 2 HOUR), DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(2, 1, 15, 450.00, 3, 'I can deliver this very quickly. I''ll use MongoDB to cache the linked accounts to avoid hitting Patreon rate limits.', 'PENDING', DATE_SUB(NOW(), INTERVAL 5 HOUR), DATE_SUB(NOW(), INTERVAL 5 HOUR)),
(3, 1, 16, 300.00, 7, 'I''ll build exactly what you need. My code is fully documented. I''ve read the Patreon API docs and have a plan for the webhook integration.', 'PENDING', DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
(4, 4, 17, 600.00, 14, 'I am an expert at Figma plugins and Tailwind. I can definitely build this exporter for you.', 'ACCEPTED', DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY));
