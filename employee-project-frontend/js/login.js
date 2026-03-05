const API = "http://localhost:5000";

document.getElementById("loginForm").addEventListener("submit", async function(e){

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const role = document.getElementById("role").value;

let endpoint;

if(role === "admin"){
endpoint = "/admin/login";
}else{
endpoint = "/employees/login";
}

const res = await fetch(API + endpoint,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({email,password})
});

const data = await res.json();

if(data.token){

localStorage.setItem("token",data.token);
localStorage.setItem("role",data.role);

if(role === "admin"){
window.location.href="pages/admin-dashboard.html";
}else{
window.location.href="pages/employee-dashboard.html";
}

}else{

alert(data.message);

}

});