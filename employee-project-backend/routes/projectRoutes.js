const express = require("express");
const router = express.Router();
const db = require("../db");

/* =========================
GET ALL PROJECTS
========================= */

router.get("/", (req, res) => {

const sql = "SELECT * FROM project";

db.query(sql,(err,result)=>{

if(err){
return res.status(500).json({message:"Database error"});
}

res.json(result);

});

});

/* =========================
CREATE PROJECT
========================= */

router.post("/", (req,res)=>{

const {
project_name,
project_description,
start_date,
end_date,
project_status
} = req.body;

const sql = `
INSERT INTO project
(project_name,project_description,start_date,end_date,project_status)
VALUES (?,?,?,?,?)
`;

db.query(sql,[
project_name,
project_description,
start_date,
end_date,
project_status
],(err,result)=>{

if(err){
return res.status(500).json({message:"Insert failed"});
}

res.json({
message:"Project created successfully"
});

});

});

/* =========================
SUGGEST EMPLOYEES FOR PROJECT
========================= */

router.get("/suggest/:projectId",(req,res)=>{

const projectId = req.params.projectId;

const sql = `
SELECT DISTINCT e.employee_id, e.name, e.department
FROM employee e
JOIN employee_skill es ON e.employee_id = es.employee_id
JOIN project_skill ps ON es.skill_id = ps.skill_id
WHERE ps.project_id = ?
`;

db.query(sql,[projectId],(err,result)=>{

if(err){
return res.status(500).json({message:"Database error"});
}

res.json(result);

});

});

/* Project Status Stats */

router.get("/status-stats",(req,res)=>{

const sql = `
SELECT project_status, COUNT(*) as total
FROM project
GROUP BY project_status
`;

db.query(sql,(err,result)=>{

if(err){
return res.status(500).json({message:"Database error"});
}

res.json(result);

});

});

module.exports = router;

