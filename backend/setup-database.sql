-- PostgreSQL Database Setup Script for Todo Application
-- Run this script as a PostgreSQL superuser (e.g., postgres)
-- 
-- INSTRUCTIONS:
-- 1. Open Command Prompt as Administrator
-- 2. Run: psql -U postgres
-- 3. Enter your postgres superuser password
-- 4. Copy and paste the commands below one by one, OR
-- 5. Run: psql -U postgres -f setup-database.sql

-- Create database
CREATE DATABASE tododb;

-- Create user
CREATE USER todo_user WITH ENCRYPTED PASSWORD 'todo_password';

-- Grant privileges on database
GRANT ALL PRIVILEGES ON DATABASE tododb TO todo_user;

-- Connect to the tododb database (you'll need to do this manually if running line by line)
-- \c tododb;

-- Grant schema privileges (run these after connecting to tododb)
GRANT ALL ON SCHEMA public TO todo_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO todo_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO todo_user;

-- Ensure future tables/sequences are also accessible
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO todo_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO todo_user;

-- Verify the setup
SELECT datname FROM pg_database WHERE datname = 'tododb';
SELECT usename FROM pg_user WHERE usename = 'todo_user';