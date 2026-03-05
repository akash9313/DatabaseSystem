const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");

const JWT_SECRET = process.env.JWT_SECRET || "proassign_secret";

/* ============================
   ADMIN LOGIN
============================ */

router.post("/login", (req, res) => {

const { email, password } = req.body;

const sql = `
SELECT admin_id, email
FROM admin
WHERE email = ? AND password = ?
`;

db.query(sql, [email, password], (err, result) => {

if (err) {
return res.status(500).json({ message: "Database error" });
}

if (result.length === 0) {
return res.status(401).json({ message: "Invalid admin credentials" });
}

const admin = result[0];

const token = jwt.sign(
{
id: admin.admin_id,
role: "admin"
},
JWT_SECRET,
{ expiresIn: "1h" }
);

res.json({
message: "Admin login successful",
token,
role: "admin",
admin
});

});

});

module.exports = router;