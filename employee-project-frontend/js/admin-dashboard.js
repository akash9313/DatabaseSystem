const API = "http://localhost:5000";
const token = localStorage.getItem("token");

/* ======================
Check Login
====================== */

if (!token) {
  window.location.href = "../index.html";
}

/* ======================
Logout
====================== */

function logout() {
  localStorage.removeItem("token");
  window.location.href = "../index.html";
}

window.logout = logout;

/* ======================
Section Switch
====================== */

function showSection(id){

document.querySelectorAll(".section").forEach(sec=>{
sec.style.display="none";
});

document.getElementById(id).style.display="block";

/* Destroy charts when leaving dashboard */
if(id !== "dashboard"){
destroyCharts();
}

/* Load section data */

if(id === "dashboard") loadDashboard();
if(id === "employees") loadEmployees();
if(id === "skills") loadSkills();
if(id === "employeeSkills") loadEmployeeSkills();
if(id === "projects") loadProjects();
if(id === "allocation"){
loadAllocations();
loadEmployeeDropdown();
loadProjectDropdown();
}

}

window.showSection = showSection;

/* ======================
Load Dashboard Stats
====================== */

async function loadDashboard(){

/* Employees */

const empRes = await fetch(API + "/employees",{
headers:{ Authorization:"Bearer " + token }
});
const employees = await empRes.json();

document.getElementById("empCount").innerText = employees.length;


/* Skills */

const skillRes = await fetch(API + "/skills",{
headers:{ Authorization:"Bearer " + token }
});
const skills = await skillRes.json();

document.getElementById("skillCount").innerText = skills.length;


/* Projects */

const projectRes = await fetch(API + "/projects",{
headers:{ Authorization:"Bearer " + token }
});
const projects = await projectRes.json();

document.getElementById("projectCount").innerText = projects.length;


/* Allocations */

const allocRes = await fetch(API + "/allocation",{
headers:{ Authorization:"Bearer " + token }
});
const allocations = await allocRes.json();

document.getElementById("allocationCount").innerText = allocations.length;


/* Charts */

await loadDepartmentChart();
await loadProjectChart();

}

/* ======================
Load Employees
====================== */

async function loadEmployees() {

  try {

    const res = await fetch(API + "/employees", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await res.json();

    const table = document.getElementById("employeeTable");

    if (!table) return;

    table.innerHTML = "";

    data.forEach(emp => {

      table.innerHTML += `
      <tr>
        <td>${emp.employee_id}</td>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.department_id}</td>
        <td>${emp.designation}</td>
      </tr>
      `;

    });

    const count = document.getElementById("empCount");
    if (count) count.innerText = data.length;

  } catch (err) {

    alert("Session expired. Please login again");
    logout();

  }
}

/* ======================
Add Employee
====================== */

document.addEventListener("DOMContentLoaded", () => {

  const employeeForm = document.getElementById("employeeForm");

  if (employeeForm) {

    employeeForm.addEventListener("submit", async function (e) {

      e.preventDefault();

      const employee = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phone: document.getElementById("phone").value,
        department_id: document.getElementById("department_id").value,
        designation: document.getElementById("designation").value,
        experience_years: document.getElementById("experience").value,
        availability_status: document.getElementById("status").value

      };

      const res = await fetch(API + "/employees", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },

        body: JSON.stringify(employee)

      });

      const data = await res.json();

      alert(data.message);

      employeeForm.reset();

      loadEmployees();

    });

  }

});

/* ======================
Load Skills
====================== */

async function loadSkills() {

  const res = await fetch(API + "/skills", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();

  const table = document.getElementById("skillTable");

  if (!table) return;

  table.innerHTML = "";

  data.forEach(skill => {

    table.innerHTML += `
    <tr>
      <td>${skill.skill_id}</td>
      <td>${skill.skill_name}</td>
      <td>${skill.skill_category}</td>
    </tr>
    `;

  });

}

/* ======================
Add Skill
====================== */

document.addEventListener("DOMContentLoaded", function () {

const skillForm = document.getElementById("skillForm");

if (skillForm) {

skillForm.addEventListener("submit", async function(e){

e.preventDefault();   // VERY IMPORTANT (prevents page reload)

try{

const skill = {

skill_name: document.getElementById("skill_name").value,
skill_category: document.getElementById("skill_category").value,
description: document.getElementById("skill_description").value

};

const res = await fetch(API + "/skills",{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:"Bearer " + token
},

body: JSON.stringify(skill)

});

const data = await res.json();

alert(data.message || "Skill Added Successfully");

skillForm.reset();

loadSkills();

}catch(err){

console.log(err);
alert("Error adding skill");

}

});

}

});

/* ======================
Load Employee Skills
====================== */

async function loadEmployeeSkills() {

  const res = await fetch(API + "/employee-skills", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();

  const table = document.getElementById("employeeSkillTable");

  if (!table) return;

  table.innerHTML = "";

  data.forEach(row => {

    table.innerHTML += `
    <tr>
      <td>${row.name}</td>
      <td>${row.skill_name}</td>
      <td>${row.proficiency_level}</td>
      <td>${row.years_of_experience}</td>
    </tr>
    `;

  });

}

/* ======================
Assign Skill to Employee
====================== */

document.addEventListener("DOMContentLoaded", function () {

const assignForm = document.getElementById("assignSkillForm");

if (assignForm) {

assignForm.addEventListener("submit", async function(e){

e.preventDefault(); // stops page reload

try{

const skill = {

employee_id: document.getElementById("employee_id").value,
skill_id: document.getElementById("skill_id").value,
proficiency_level: document.getElementById("level").value,
years_of_experience: document.getElementById("years").value

};

const res = await fetch(API + "/employee-skills",{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:"Bearer " + token
},

body: JSON.stringify(skill)

});

const data = await res.json();

alert(data.message || "Skill assigned successfully");

assignForm.reset();

loadEmployeeSkills();

}catch(err){

console.log(err);
alert("Error assigning skill");

}

});

}

});

/* ======================
Load Projects
====================== */

async function loadProjects(){

const res = await fetch(API + "/projects",{
headers:{
Authorization:"Bearer " + token
}
});

const data = await res.json();

const table = document.getElementById("projectTable");

if(!table) return;

table.innerHTML="";

data.forEach(project=>{

table.innerHTML += `
<tr>
<td>${project.project_id}</td>
<td>${project.project_name}</td>
<td>${project.project_status}</td>
<td>${project.start_date}</td>
<td>${project.end_date}</td>
</tr>
`;

});

document.getElementById("projectCount").innerText = data.length;

}

/* ======================
Add Project
====================== */

const projectForm = document.getElementById("projectForm");

if(projectForm){

projectForm.addEventListener("submit", async function(e){

e.preventDefault();

const project = {

project_name: document.getElementById("project_name").value,
project_description: document.getElementById("project_description").value,
start_date: document.getElementById("start_date").value,
end_date: document.getElementById("end_date").value,
project_status: document.getElementById("project_status").value

};

const res = await fetch(API + "/projects",{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:"Bearer " + token
},

body: JSON.stringify(project)

});

const data = await res.json();

alert(data.message);

projectForm.reset();

loadProjects();

});

}

/* ======================
Load Allocations
====================== */

async function loadAllocations(){

const res = await fetch(API + "/allocation",{
headers:{
Authorization:"Bearer " + token
}
});

const data = await res.json();

const table = document.getElementById("allocationTable");

if(!table) return;

table.innerHTML="";

data.forEach(row=>{

table.innerHTML += `
<tr>
<td>${row.name}</td>
<td>${row.project_name}</td>
<td>${row.role_in_project}</td>
<td>${row.allocation_date}</td>
</tr>
`;

});

}

/* ======================
Add Allocation
====================== */

const allocationForm = document.getElementById("allocationForm");

if(allocationForm){

allocationForm.addEventListener("submit", async function(e){

e.preventDefault();

const allocation = {

employee_id: document.getElementById("alloc_employee_id").value,
project_id: document.getElementById("alloc_project_id").value,
role_in_project: document.getElementById("role").value,
allocation_date: document.getElementById("alloc_date").value

};

const res = await fetch(API + "/allocation",{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:"Bearer " + token
},

body: JSON.stringify(allocation)

});

const data = await res.json();

alert(data.message);

allocationForm.reset();

loadAllocations();

});

}

async function loadEmployeeDropdown(){

const res = await fetch(API + "/employees",{
headers:{ Authorization:"Bearer " + token }
});

const data = await res.json();

const dropdown = document.getElementById("alloc_employee_id");

if(!dropdown) return;

dropdown.innerHTML = '<option value="">Select Employee</option>';

data.forEach(emp=>{
dropdown.innerHTML += `
<option value="${emp.employee_id}">
${emp.name} (${emp.department_id})
</option>
`;
});

}

async function loadProjectDropdown(){

const res = await fetch(API + "/projects",{
headers:{ Authorization:"Bearer " + token }
});

const data = await res.json();

const dropdown = document.getElementById("alloc_project_id");

if(!dropdown) return;

dropdown.innerHTML = '<option value="">Select Project</option>';

data.forEach(project=>{
dropdown.innerHTML += `
<option value="${project.project_id}">
${project.project_name}
</option>
`;
});

}

/* ======================
Suggest Employees
====================== */

async function suggestEmployees(){

const projectId = document.getElementById("alloc_project_id").value;

if(!projectId) return;

const res = await fetch(API + "/projects/suggest/" + projectId,{
headers:{
Authorization:"Bearer " + token
}
});

const data = await res.json();

const table = document.getElementById("suggestedEmployees");

table.innerHTML = "";

data.forEach(emp=>{

table.innerHTML += `
<tr>
<td>${emp.name}</td>
<td>${emp.department_id}</td>
</tr>
`;

});

}

let departmentChart;

async function loadDepartmentChart(){

const res = await fetch(API + "/employees/department-stats");
const data = await res.json();

const labels = data.map(d => d.department_id);
const values = data.map(d => d.total);

const ctx = document.getElementById("departmentChart");

if(!ctx) return;

if(departmentChart) departmentChart.destroy();

departmentChart = new Chart(ctx,{
type:"bar",
data:{
labels:labels,
datasets:[{
label:"Employees per Department",
data:values,
backgroundColor:"#38bdf8"
}]
}
});

}

let projectChart;

async function loadProjectChart(){

const res = await fetch(API + "/projects/status-stats");
const data = await res.json();

const labels = data.map(p => p.project_status);
const values = data.map(p => p.total);

const ctx = document.getElementById("projectStatusChart");

if(!ctx) return;

if(projectChart) projectChart.destroy();

projectChart = new Chart(ctx,{
type:"pie",
data:{
labels:labels,
datasets:[{
data:values,
backgroundColor:[
"#38bdf8",
"#22c55e",
"#f59e0b"
]
}]
}
});

}

function destroyCharts(){

if(departmentChart){
departmentChart.destroy();
departmentChart = null;
}

if(projectChart){
projectChart.destroy();
projectChart = null;
}

}

/* ======================
Initial Load
====================== */

window.onload = () => {
  showSection("dashboard");
};

