const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const allocationRoutes = require("./routes/allocationRoutes");
const employeeSkillRoutes = require("./routes/employeeSkillRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/employees", employeeRoutes);
app.use("/projects", projectRoutes);
app.use("/skills", skillRoutes);
app.use("/allocation", allocationRoutes);
app.use("/employee-skills", employeeSkillRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});