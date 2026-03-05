const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const JWT_SECRET = "proassign_secret";

/* ============================
   EMPLOYEE LOGIN
============================ */

router.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql = `
    SELECT employee_id, name, department, designation
    FROM employee
    WHERE email = ? AND password = ?
  `;

  db.query(sql, [email, password], (err, result) => {

    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid employee credentials" });
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
      message: "Employee login successful",
      token,
      role: "employee",
      employee
    });

  });

});


/* ============================
   GET ALL EMPLOYEES
============================ */

router.get("/", authMiddleware, (req, res) => {

  const sql = "SELECT * FROM employee";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json(result);

  });

});


/* ============================
   ADD NEW EMPLOYEE
============================ */

router.post("/", authMiddleware, (req, res) => {

const {
name,
email,
password,
phone,
department,
designation,
experience_years,
availability_status
} = req.body;

const sql = `
INSERT INTO employee
(name,email,password,phone,department,designation,experience_years,availability_status)
VALUES (?,?,?,?,?,?,?,?)
`;

db.query(sql,[
name,
email,
password,
phone,
department,
designation,
experience_years,
availability_status
],(err,result)=>{

if(err){
return res.status(500).json({message:"Insert failed"});
}

res.json({message:"Employee added successfully"});

});

});


/* ============================
   GET EMPLOYEE PROFILE
============================ */

router.get("/profile/:id", authMiddleware, (req, res) => {

  const id = req.params.id;

  const sql = `
  SELECT name,email,department,designation,experience_years,availability_status
  FROM employee
  WHERE employee_id = ?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json(result[0]);

  });

});


module.exports = router;