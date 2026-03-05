const express = require("express");
const router = express.Router();
const db = require("../db");

/* =========================
GET ALL ALLOCATIONS
========================= */

router.get("/", (req,res)=>{

const sql = `
SELECT e.name, p.project_name, a.role_in_project, a.allocation_date
FROM allocation a
JOIN employee e ON a.employee_id = e.employee_id
JOIN project p ON a.project_id = p.project_id
`;

db.query(sql,(err,result)=>{

if(err){
return res.status(500).json({message:"Database error"});
}

res.json(result);

});

});

/* =========================
CREATE ALLOCATION
========================= */

router.post("/",(req,res)=>{

const {
employee_id,
project_id,
role_in_project,
allocation_date
} = req.body;

const sql = `
INSERT INTO allocation
(employee_id,project_id,role_in_project,allocation_date)
VALUES (?,?,?,?)
`;

db.query(sql,[
employee_id,
project_id,
role_in_project,
allocation_date
],(err,result)=>{

if(err){
return res.status(500).json({message:"Allocation failed"});
}

res.json({
message:"Employee allocated to project"
});

});

});

module.exports = router;