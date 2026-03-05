const express = require("express");
const router = express.Router();
const db = require("../db");

/* =========================
   GET ALL SKILLS
========================= */
router.get("/", (req, res) => {

const sql = "SELECT * FROM skill";

db.query(sql, (err, result) => {

if(err){
return res.status(500).json({message:"Database error"});
}

res.json(result);

});

});


/* =========================
   ADD NEW SKILL
========================= */
router.post("/", (req, res) => {

const { skill_name, skill_category, description } = req.body;

const sql = `
INSERT INTO skill (skill_name, skill_category, description)
VALUES (?, ?, ?)
`;

db.query(sql, [skill_name, skill_category, description], (err, result)=>{

if(err){
return res.status(500).json({message:"Skill insert failed"});
}

res.json({message:"Skill added successfully"});

});

});

module.exports = router;