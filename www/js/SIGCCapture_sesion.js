
//*********************************************************
function AbrirMenu() 
{ 
window.location = ("./menu.html"); 
} 

function AbrirLogin() 
{ 
window.location = ("./index.html"); 
} 
function SalirSesion() 
{ 
window.location = ("./index.html"); 
localStorage.setItem("Sesion",0);
navigator.app.exitApp();
} 
function SalirSesionMod() 
{ 
window.location = ("../index.html"); 
localStorage.setItem("Sesion",0);
navigator.app.exitApp();
} 

