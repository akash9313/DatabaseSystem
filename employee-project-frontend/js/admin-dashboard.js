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

function showSection(id) {

  const sections = document.querySelectorAll(".section");

  sections.forEach(sec => {
    sec.style.display = "none";
  });

  const selected = document.getElementById(id);

  if (selected) {
    selected.style.display = "block";
  }

  if (id === "employees") loadEmployees();
  if (id === "skills") loadSkills();
  if (id === "employeeSkills") loadEmployeeSkills();
  if(id==="projects") loadProjects();
  if(id==="allocation"){
  loadAllocations();
  loadEmployeeDropdown();
  loadProjectDropdown();
  }
}

window.showSection = showSection;

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
        <td>${emp.department}</td>
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
        department: document.getElementById("department").value,
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
${emp.name} (${emp.department})
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
Initial Load
====================== */

window.onload = () => {
  loadEmployees();
};

