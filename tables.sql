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

INSERT INTO department(department_name)
VALUES
('HR'),
('IT'),
('Finance'),
('Marketing'),
('Operations');


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

INSERT INTO employee
(name,email,password,phone,department_id,designation,experience_years,availability_status)
VALUES
('Akash Uchachariya','akashuchachariya9313@gmail.com','123456','9313357315',1,'Software Developer',2,'Available'),
('Rahul Sharma','rahul@gmail.com','123456','9876543210',2,'Backend Developer',4,'Available'),
('Priya Patel','priya@gmail.com','123456','9823456712',3,'Frontend Developer',3,'Busy'),
('Amit Singh','amit@gmail.com','123456','9123456789',4,'UI Designer',2,'Available'),
('Neha Verma','neha@gmail.com','123456','9988776655',2,'Full Stack Developer',5,'Busy'),
('Rohan Mehta','rohan@gmail.com','123456','9112233445',5,'Project Manager',6,'Available'),
('Kavita Shah','kavita@gmail.com','123456','9870011223',3,'QA Engineer',3,'Available');

-- ======================
-- SKILL
-- ======================

CREATE TABLE skill(
skill_id INT AUTO_INCREMENT PRIMARY KEY,
skill_name VARCHAR(50),
skill_category VARCHAR(50),
description TEXT
);

INSERT INTO skill
(skill_name,skill_category,description)
VALUES
('JavaScript','Programming','Frontend and backend scripting'),
('Python','Programming','Backend development and automation'),
('React','Frontend Framework','Building modern web interfaces'),
('Node.js','Backend Framework','Server side JavaScript runtime'),
('MySQL','Database','Relational database management'),
('HTML','Web Development','Structure of web pages'),
('CSS','Web Development','Styling web pages'),
('UI/UX Design','Design','User interface and experience design'),
('Testing','Quality Assurance','Software testing skills');

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

INSERT INTO project
(project_name,project_description,start_date,end_date,project_status)
VALUES
('Employee Skill Tracker','System to manage employee skills','2025-01-10','2025-06-30','Ongoing'),

('E-Commerce Website','Online shopping platform','2025-02-15','2025-08-10','Ongoing'),

('Hospital Management System','System for managing hospital operations','2024-09-01','2025-01-30','Completed'),

('AI Resume Screening Tool','AI based recruitment system','2025-03-01','2025-09-01','Planned');

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

INSERT INTO employee_skill
(employee_id,skill_id,proficiency_level,years_of_experience)
VALUES
(1,1,'Advanced',2),
(1,4,'Intermediate',2),
(1,5,'Intermediate',1),

(2,4,'Advanced',4),
(2,2,'Intermediate',3),

(3,3,'Advanced',3),
(3,6,'Advanced',3),

(4,8,'Advanced',2),

(5,1,'Advanced',5),
(5,3,'Advanced',4),
(5,4,'Advanced',5),

(6,5,'Advanced',6),

(7,9,'Intermediate',3);

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

INSERT INTO project_skill
(project_id,skill_id,required_level)
VALUES
(1,1,'Intermediate'),
(1,4,'Intermediate'),
(1,5,'Basic'),

(2,3,'Advanced'),
(2,1,'Intermediate'),
(2,7,'Intermediate'),

(3,2,'Intermediate'),
(3,5,'Intermediate'),

(4,2,'Advanced'),
(4,1,'Advanced');

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

INSERT INTO allocation
(employee_id,project_id,role_in_project,allocation_date)
VALUES
(1,1,'Backend Developer','2025-03-01'),
(2,1,'API Developer','2025-03-02'),
(3,2,'Frontend Developer','2025-03-03'),
(5,2,'Full Stack Developer','2025-03-04'),
(4,2,'UI Designer','2025-03-05'),
(6,1,'Project Manager','2025-03-01'),
(7,3,'QA Engineer','2024-10-01');

SELECT 
e.employee_id,
e.name,
e.email,
d.department_name AS department,
e.designation
FROM employee e
JOIN department d 
ON e.department_id = d.department_id