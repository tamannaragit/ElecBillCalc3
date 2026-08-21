CREATE DATABASE IF NOT EXISTS electricity_bill_db;

USE electricity_bill_db;


-- =========================================
-- USERS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    username VARCHAR(50) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL

);


-- =========================================
-- BILLS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS bills (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    billing_month DATE NOT NULL,

    units DECIMAL(10,2) NOT NULL,

    amount DECIMAL(10,2) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    UNIQUE (user_id, billing_month)

);


-- =========================================
-- SAMPLE USER
-- =========================================

INSERT IGNORE INTO users
    (full_name, username, password)
VALUES
    ('Demo User', 'demo', 'demo123');


-- =========================================
-- SAMPLE BILLS
-- =========================================

INSERT IGNORE INTO bills
    (user_id, billing_month, units, amount)
VALUES
    (1, '2026-03-01', 250, 1095.00);

INSERT IGNORE INTO bills
    (user_id, billing_month, units, amount)
VALUES
    (1, '2026-02-01', 180, 731.00);


-- =========================================
-- VIEW DATA
-- =========================================

SELECT * FROM users;

SELECT * FROM bills;