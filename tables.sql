DROP DATABASE employee_project_db;

CREATE DATABASE employee_project_db;
USE employee_project_db;

-- ======================
-- ADMIN
-- ======================

CREATE TABLE admin(
admin_id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(100) UNIQUE,
password VARCHAR(255)
);

INSERT INTO admin(email,password)
VALUES
('admin@gmail.com','admin@123'),
('admin2@gmail.com','admin@123');


-- ======================
-- DEPARTMENT
-- ======================

CREATE TABLE department(
department_id INT AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(50) UNIQUE
);


-- ======================
-- EMPLOYEE
-- ======================

CREATE TABLE employee(
employee_id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100) UNIQUE,
password VARCHAR(255),
phone VARCHAR(15),
department_id INT,
designation VARCHAR(50),
experience_years INT,
availability_status VARCHAR(20),

FOREIGN KEY(department_id) REFERENCES department(department_id)
);


-- ======================
-- SKILL
-- ======================

CREATE TABLE skill(
skill_id INT AUTO_INCREMENT PRIMARY KEY,
skill_name VARCHAR(50),
skill_category VARCHAR(50),
description TEXT
);


-- ======================
-- PROJECT
-- ======================

CREATE TABLE project(
project_id INT AUTO_INCREMENT PRIMARY KEY,
project_name VARCHAR(100),
project_description TEXT,
start_date DATE,
end_date DATE,
project_status VARCHAR(20)
);


-- ======================
-- EMPLOYEE SKILL
-- ======================

CREATE TABLE employee_skill(
emp_skill_id INT AUTO_INCREMENT PRIMARY KEY,
employee_id INT,
skill_id INT,
proficiency_level VARCHAR(20),
years_of_experience INT,

FOREIGN KEY(employee_id) REFERENCES employee(employee_id),
FOREIGN KEY(skill_id) REFERENCES skill(skill_id)
);


-- ======================
-- PROJECT SKILL
-- ======================

CREATE TABLE project_skill(
project_skill_id INT AUTO_INCREMENT PRIMARY KEY,
project_id INT,
skill_id INT,
required_level VARCHAR(20),

FOREIGN KEY(project_id) REFERENCES project(project_id),
FOREIGN KEY(skill_id) REFERENCES skill(skill_id)
);


-- ======================
-- ALLOCATION
-- ======================

CREATE TABLE allocation(
allocation_id INT AUTO_INCREMENT PRIMARY KEY,
employee_id INT,
project_id INT,
role_in_project VARCHAR(50),
allocation_date DATE,

FOREIGN KEY(employee_id) REFERENCES employee(employee_id),
FOREIGN KEY(project_id) REFERENCES project(project_id)
);