const express = require("express");
const router = express.Router();
const db = require("../db");

/* =========================
   ASSIGN SKILL TO EMPLOYEE
========================= */

router.post("/", (req,res)=>{

const {employee_id, skill_id, proficiency_level, years_of_experience} = req.body;

const sql = `
INSERT INTO employee_skill
(employee_id, skill_id, proficiency_level, years_of_experience)
VALUES (?, ?, ?, ?)
`;

db.query(sql,
[employee_id, skill_id, proficiency_level, years_of_experience],
(err,result)=>{

if(err){
return res.status(500).json({message:"Skill assignment failed"});
}

res.json({message:"Skill assigned successfully"});

});

});


/* =========================
   VIEW EMPLOYEE SKILLS
========================= */

router.get("/", (req,res)=>{

const sql = `
SELECT 
e.name,
s.skill_name,
es.proficiency_level,
es.years_of_experience

FROM employee_skill es

JOIN employee e
ON es.employee_id = e.employee_id

JOIN skill s
ON es.skill_id = s.skill_id
`;

db.query(sql,(err,result)=>{

if(err){
return res.status(500).json({message:"Database error"});
}

res.json(result);

});

});

module.exports = router;