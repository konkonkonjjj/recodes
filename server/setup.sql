-- 减脂营养计划 — MySQL 建库建表脚本
-- 执行方式: mysql -u root -p < setup.sql

CREATE DATABASE IF NOT EXISTS bmr_app
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bmr_app;

-- 用户信息表
CREATE TABLE IF NOT EXISTS user_profile (
  id INT PRIMARY KEY DEFAULT 1,
  gender VARCHAR(10) NOT NULL COMMENT 'male | female',
  age INT NOT NULL,
  height FLOAT NOT NULL COMMENT 'cm',
  weight FLOAT NOT NULL COMMENT 'kg',
  activity_level VARCHAR(20) NOT NULL COMMENT 'sedentary|light|moderate|active',
  deficit INT NOT NULL DEFAULT 500 COMMENT '热量缺口 kcal',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 饮食记录表
CREATE TABLE IF NOT EXISTS meal_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  record_date DATE NOT NULL,
  meal_type ENUM('breakfast','lunch','dinner','snack') NOT NULL,
  food_name VARCHAR(100) NOT NULL,
  food_category VARCHAR(20) DEFAULT '',
  grams INT NOT NULL,
  calories INT NOT NULL,
  protein FLOAT NOT NULL,
  carbs FLOAT NOT NULL,
  fat FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_date (record_date),
  INDEX idx_date_meal (record_date, meal_type)
) ENGINE=InnoDB;

-- 自定义食物表
CREATE TABLE IF NOT EXISTS custom_foods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(20) NOT NULL,
  calories FLOAT NOT NULL,
  protein FLOAT NOT NULL,
  carbs FLOAT NOT NULL,
  fat FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 插入默认用户数据（可选）
INSERT IGNORE INTO user_profile (id, gender, age, height, weight, activity_level, deficit)
VALUES (1, 'male', 30, 170, 75, 'light', 500);
