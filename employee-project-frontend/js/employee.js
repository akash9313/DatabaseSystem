const API = "http://localhost:5000";
const token = localStorage.getItem("token");

if(!token){
window.location.href="../index.html";
}

function logout(){
localStorage.removeItem("token");
window.location.href="../index.html";
}

window.logout = logout;

/* Section Switch */

function showSection(id){

document.querySelectorAll(".section").forEach(sec=>{
sec.style.display="none";
});

document.getElementById(id).style.display="block";

if(id==="profile") loadProfile();
if(id==="skills") loadSkills();
if(id==="projects") loadProjects();

}

window.showSection = showSection;

async function loadDashboard(){

await loadSkills();
await loadProjects();

}


/* Load Profile */

async function loadProfile(){

const employeeId = localStorage.getItem("employee_id");

try{

const res = await fetch(API + "/employees/profile/" + employeeId,{
headers:{
Authorization: "Bearer " + token
}
});

if(!res.ok){
console.log("Server error",res.status);
return;
}

const data = await res.json();

document.getElementById("empName").innerText = data.name;
document.getElementById("empEmail").innerText = data.email;
document.getElementById("empDepartment").innerText = data.department;
document.getElementById("empDesignation").innerText = data.designation;
document.getElementById("empExperience").innerText = data.experience_years;
document.getElementById("empStatus").innerText = data.availability_status;

}catch(err){

console.log("Profile fetch error:",err);

}

}

/* Load Skills */

async function loadSkills(){

const res = await fetch(API+"/employee-skills/my",{
headers:{
Authorization:"Bearer "+token
}
});

const data = await res.json();

const table = document.getElementById("skillTable");

table.innerHTML="";

data.forEach(skill=>{

table.innerHTML+=`
<tr>
<td>${skill.skill_name}</td>
<td>${skill.proficiency_level}</td>
<td>${skill.years_of_experience}</td>
</tr>
`;

});

document.getElementById("skillCount").innerText=data.length;

}


/* Load Projects */

async function loadProjects(){

const res = await fetch(API+"/employees/projects/my",{
headers:{
Authorization:"Bearer "+token
}
});

const data = await res.json();

const table = document.getElementById("projectTable");

table.innerHTML="";

data.forEach(project=>{

table.innerHTML+=`
<tr>
<td>${project.project_name}</td>
<td>${project.project_status}</td>
<td>${project.role_in_project}</td>
</tr>
`;

});

document.getElementById("projectCount").innerText=data.length;

}

/* Initial Load */

window.onload = () => {

showSection("dashboard");
loadDashboard();
loadProfile();
loadSkills();
loadProjects();

};