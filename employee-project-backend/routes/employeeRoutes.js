const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const JWT_SECRET = "proassign_secret";


/* ==========================
EMPLOYEE LOGIN
========================== */

router.post("/login", (req, res) => {

const { email, password } = req.body;

const sql = `
SELECT 
e.employee_id,
e.name,
d.department_name AS department,
e.designation
FROM employee e
JOIN department d 
ON e.department_id = d.department_id
WHERE e.email = ? AND e.password = ?
`;

db.query(sql,[email,password],(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Database error"});
}

if(result.length === 0){
return res.status(401).json({message:"Invalid employee credentials"});
}

const employee = result[0];

const token = jwt.sign(
{
id: employee.employee_id,
role: "employee"
},
JWT_SECRET,
{ expiresIn: "1h" }
);

res.json({
message:"Employee login successful",
token,
role:"employee",
employee
});

});

});


/* ==========================
GET ALL EMPLOYEES
========================== */

router.get("/", authMiddleware, (req,res)=>{

const sql = `
SELECT 
e.employee_id,
e.name,
e.email,
d.department_name AS department,
e.designation
FROM employee e
JOIN department d
ON e.department_id = d.department_id
`;

db.query(sql,(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Database error"});
}

res.json(result);

});

});


/* ==========================
ADD NEW EMPLOYEE
========================== */

router.post("/", authMiddleware, (req,res)=>{

const {
name,
email,
password,
phone,
department_id,
designation,
experience_years,
availability_status
} = req.body;

const sql = `
INSERT INTO employee
(name,email,password,phone,department_id,designation,experience_years,availability_status)
VALUES (?,?,?,?,?,?,?,?)
`;

db.query(sql,[
name,
email,
password,
phone,
department_id,
designation,
experience_years,
availability_status
],(err,result)=>{

if(err){
console.log("Employee insert error:",err);
return res.status(500).json({message:"Insert failed"});
}

res.json({message:"Employee added successfully"});

});

});


/* ==========================
GET EMPLOYEE PROFILE
========================== */

router.get("/profile/:id", authMiddleware, (req,res)=>{

const id = req.params.id;

const sql = `
SELECT 
e.name,
e.email,
d.department_name AS department,
e.designation,
e.experience_years,
e.availability_status
FROM employee e
JOIN department d
ON e.department_id = d.department_id
WHERE e.employee_id = ?
`;

db.query(sql,[id],(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Database error"});
}

res.json(result[0]);

});

});


/* ==========================
EMPLOYEES PER DEPARTMENT
(for dashboard chart)
========================== */

router.get("/department-stats",(req,res)=>{

const sql = `
SELECT 
d.department_name AS department,
COUNT(e.employee_id) AS total
FROM department d
LEFT JOIN employee e
ON d.department_id = e.department_id
GROUP BY d.department_name
`;

db.query(sql,(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Database error"});
}

res.json(result);

});

});


module.exports = router;