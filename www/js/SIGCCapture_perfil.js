
//---- CREAR BDD
var myDB;
//Open Database Connection
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", androidDatabaseImplementation: 2, location: 'default'});
//alert("Base de datos creada");
MostrarUsuario();
}

//---- CREAR TABLA
function creartabla(){
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS t_usuarios (cedula text primary key, nombre text,apellido text,foto text,mail text,celular text,direccion text ,password text,brigada text,levantamiento text,contratonumero text,estado text)', [],
        function(tx, result) {
           alert("Tabla creada exitosamente");
           //cargarCatalogo();
           //cargarDPA();
        }, 
        function(error) {
         //  alert("Error occurred while creating the table.");
        });
    });
}

//--- INSERTAR 
 function InsertarUsuario(user){
 //	alert ("OK Entra" + user[0].FOTO);
 	var x=user[0].FOTO;
    if(x !=""){
    var url=user[0].FOTO.split(",");
    var url2=url[0].split(":");
    var url3=url[0].split("/");
    var nombre_foto="";
    nombre_foto=url3[1].replace("\"", "");
    nombre_foto=nombre_foto.replace("\"", "");
  	}
 myDB.transaction(function(transaction) {
 var executeQuery = "INSERT INTO t_usuarios (cedula,nombre,apellido,foto,mail,celular,direccion,password,brigada,levantamiento,contratonumero,estado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";             
      transaction.executeSql(executeQuery, [user[0].CEDULA,user[0].NOMBRE,user[0].APELLIDOS,nombre_foto,user[0].EMAIL,user[0].CELULAR,user[0].DIRECCION,user[0].USER_PASSWORD,user[0].NOMBRE_BRIGADA,user[0].LEVANTAMIENTO,user[0].CONTRATO,user[0].ESTADO]
      , function(tx, result) {
     // 	alert("Insertado con exito"+user[0].NOMBRE);
      	AbrirMenu();
      },
      function(error){
    // 	alert("Error al insertar");
      });
     });  
}

//---- MOSTRAR
 function MostrarUsuario(){
// 	alert ("OK Entra a mostrar");
 myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM t_usuarios', [], function (tx, results) {
       var len = results.rows.length, i;
      // alert ("OK a mostrar en los textos"+results.rows.item(0).nombre);
       document.getElementById("txt_cedula").innerHTML=results.rows.item(0).cedula;
       document.getElementById("txt_nombre").innerHTML=results.rows.item(0).nombre;
       document.getElementById("txt_apellidos").innerHTML=results.rows.item(0).apellido;
       var photo = document.getElementById("imgfoto");
       if(results.rows.item(0).foto!=""){
       	photo.src="http://jaapp.geotactics.com.ec/files/"+results.rows.item(0).foto;
       }
       else{
       		photo.src="../css/images/userlog.png";
       	}
      // 	alert ("Mostrar fotos"+results.rows.item(0).foto);
       document.getElementById("txt_mail").innerHTML=results.rows.item(0).mail;
       document.getElementById("txt_telefono").innerHTML=results.rows.item(0).celular;
       document.getElementById("txt_direccion").innerHTML=results.rows.item(0).direccion;
       document.getElementById("txt_brigada").innerHTML=results.rows.item(0).brigada;
       document.getElementById("txt_levantamiento").innerHTML=results.rows.item(0).levantamiento;
       document.getElementById("txt_contrato").innerHTML=results.rows.item(0).contratonumero;
       document.getElementById("txt_estado").innerHTML=results.rows.item(0).estado;
    }, null);
  });
}

//--- BORRAR TABLA
 function BorrarTabla(){
 myDB.transaction(function(transaction) {
        var executeQuery = "DROP TABLE  IF EXISTS usuarios";
        transaction.executeSql(executeQuery, [],
            function(tx, result) {alert('Table deleted successfully.');},
            function(error){alert('Error occurred while droping the table.');}
        );
    });
}

function AbrirMenu() 
{ 
window.location = ("./menu.html#add-form"); 
} 

function SalirSesion() 
{ 
window.location = ("./index.html"); 
} 



//**********************************************************
//**********************************************************
function ValidaUsuario(){
  var cedula=document.getElementById("login_cedula").value;
  var pass=document.getElementById("login_password").value;
	archivoValidacion =  "http://jaapp.geotactics.com.ec/SIGCCapture/SIGCCapture_select_usuario.php?jsoncallback=?"
	
   $.getJSON( archivoValidacion, { 
   cedula:cedula,
   password:pass
    })
    .done(function(respuestaServer) { 

    if(respuestaServer.validacion == "ok"){
     var user= respuestaServer.datosU;
    //alert ("Bienvenido "+user[0].NOMBRE);
    InsertarUsuario(user);
    AbrirMenu();

    }else{   
     
     alert("Erorr");
    }
    }).fail(function() {

    })

}




//*******************************
function cargarFecha(){
//var dato = new Date().toJSON().slice(0,10);
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
    dd='0'+dd;
  } 
  if(mm<10){
    mm='0'+mm;
  } 
  var today = dd+'/'+mm+'/'+yyyy;

  console.log(today);
  $('#txt_fecha_actual').html(today);
  $('#txt_fecha_actual_vivienda').html(today);
  $('#txt_fecha_actual_familia').html(today); 
}

function cargarCatalogo(){
  archivoValidacion =  "http://jaapp.geotactics.com.ec/SIGCCapture/SIGCCapture_select_catalogos.php?jsoncallback=?"
  
   $.getJSON( archivoValidacion, { 
   //cedula:cedulaU,
   //password:pass
    })
    .done(function(respuestaServer) { 
    if(respuestaServer.validacion == "OK"){
     var user= respuestaServer.datosGenero;
     var html = "";
      for(var i=1 in respuestaServer.datosGenero) {
        html+="<option value='"+respuestaServer.datosGenero[i].ID+"'>"+respuestaServer.datosGenero[i].NOMBRE+"</option>";
    }
    $('#listb_genero').html(html);
    }
    if(respuestaServer.validacionEtnia == "OK"){
     var user= respuestaServer.datosEtnia;
     var html = "";
      for(var i=1 in respuestaServer.datosEtnia) {
        html+="<option value='"+respuestaServer.datosEtnia[i].ID+"'>"+respuestaServer.datosEtnia[i].NOMBRE+"</option>";
    }
    $('#listb_etnia').html(html);
    }
    if(respuestaServer.validacionNivelEducativo == "OK"){
     var user= respuestaServer.datosNivelEducativo;
     var html = "";
      for(var i=1 in respuestaServer.datosNivelEducativo) {
        html+="<option value='"+respuestaServer.datosNivelEducativo[i].ID+"'>"+respuestaServer.datosNivelEducativo[i].NOMBRE+"</option>";
    }
    $('#listb_nivel_educativo').html(html);
    }
    if(respuestaServer.validacionActividadEconomica == "OK"){
     var user= respuestaServer.datosActividadEconomica;
     var html = "";
      for(var i=1 in respuestaServer.datosActividadEconomica) {
        html+="<option value='"+respuestaServer.datosActividadEconomica[i].ID+"'>"+respuestaServer.datosActividadEconomica[i].NOMBRE+"</option>";
    }
    $('#listb_actividad_economica').html(html);
    }
    if(respuestaServer.validacionEstadoCivil == "OK"){
     var user= respuestaServer.datosEstadoCivil;
     var html = "";
      for(var i=1 in respuestaServer.datosEstadoCivil) {
        html+="<option value='"+respuestaServer.datosEstadoCivil[i].ID+"'>"+respuestaServer.datosEstadoCivil[i].NOMBRE+"</option>";
    }
    $('#listb_estado_civil').html(html);
    }

    else{        
     alert("Erorr");
    }
    })
    .fail(function() {
      alert("FAIL CATALOGO");
    })

}

//*********************************************************

function cargarDPA(){
archivoValidacion =  "http://jaapp.geotactics.com.ec/SIGCCapture/SIGCCapture_select_dpa.php?jsoncallback=?"
   $.getJSON( archivoValidacion, { 

    })
    .done(function(respuestaServer) { 

    if(respuestaServer.validacion_provincia == "ok"){
     var user= respuestaServer.datos_provincia;
   var html = "";
      for(var i=1 in respuestaServer.datos_provincia) {
        html+="<option value='"+respuestaServer.datos_provincia[i].ID+"'>"+respuestaServer.datos_provincia[i].NOMBRE+"</option>";
    }
    $('#listb_provincia').html(html);
    }
    if(respuestaServer.validacion_parroquia == "ok"){
     var user= respuestaServer.datos_parroquia;
   var html = "";
      for(var i=1 in respuestaServer.datos_parroquia) {
        html+="<option value='"+respuestaServer.datos_parroquia[i].ID+"'>"+respuestaServer.datos_parroquia[i].NOMBRE+"</option>";
    }
    $('#listb_parroquia').html(html);
    }
    if(respuestaServer.validacion_canton == "ok"){
     var user= respuestaServer.datos_canton;
   var html = "";
      for(var i=1 in respuestaServer.datos_canton) {
        html+="<option value='"+respuestaServer.datos_canton[i].ID+"'>"+respuestaServer.datos_canton[i].NOMBRE+"</option>";
    }
    $('#listb_canton').html(html);
    }


    else{        
     alert("Erorr");
    }
    })
    .fail(function() {
      alert("FAIL");
    })

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

