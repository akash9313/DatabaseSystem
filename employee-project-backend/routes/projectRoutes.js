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

module.exports = router;