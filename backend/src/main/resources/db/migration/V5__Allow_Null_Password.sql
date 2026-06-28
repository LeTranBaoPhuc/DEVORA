-- Allow null password for OAuth users
ALTER TABLE users MODIFY COLUMN password varchar(255) NULL;
