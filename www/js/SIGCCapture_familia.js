var myDB;
  //Open Database Connection
  document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
  myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", androidDatabaseImplementation: 2, location: 'default'});
  creartabla();
  mostrar();
  cargarFecha();

  /*NO VISIBLES*/
  document.getElementById("ul_cabeza_familia").style.display = "NONE";
  document.getElementById("ul_miembro_familia").style.display = "NONE";
  document.getElementById("txt_ci_cabeza_familia").style.display = "NONE";
  document.getElementById("txt_ci_miembro_familia").style.display = "NONE";
}

function creartabla(){
   //GENERO
   var errorCrearTabla = "Tablas Creadas Sin Problemas";

   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_relacion ('+
                            'REL_CODIGO INT PRIMARY KEY NOT NULL ,'+
                            'REL_NOMBRE char(25));', [],
        function(tx, result) {
            //alert("Table created successfully c_relacion");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table c_relacion; ";
             //alert(error);
        });
    });

   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS t_ciudadano_familia ('+
                            'CIUDF_CABEZA_FAMILIA char(13), '+
                            'CIUDF_MIEMBRO_FAMILIA char(13), '+
                            'CIUDF_RELACION INT );', [],
        function(tx, result) {
            //alert("Table created successfully c_relacion");

        }, 
        function(error) {
             errorCrearTabla +="Error occurred while creating the table t_ciudadano_familia; ";
             //alert(error);
        });
    });


 //  toast(errorCrearTabla);
 //  guardarBarrios();
} 

//c_relacion
function guardarBarrios(){

  var errorGuardarBarrios = "Se Crearon los Catalogos Sin Problemas";

  archivoValidacion =  "http://jaapp.geotactics.com.ec/SIGCCapture/SIGCCapture_select_relacion_familiar.php?jsoncallback=?"
   $.getJSON( archivoValidacion, { 

    })
    .done(function(respuestaServer) { 

    if(respuestaServer.validacion_relacion == "ok"){
     var user= respuestaServer.datos_Relacion;
     var html = "";
      for(var i=0 in respuestaServer.datos_Relacion) {
        guardarTabla2("c_relacion", "REL_CODIGO, REL_NOMBRE", "?,?", respuestaServer.datos_Relacion[i].ID, respuestaServer.datos_Relacion[i].NOMBRE);
      }
    }
    else{        
     toast("Error Barrios");
    }
    }).success(function(){
      toast(errorGuardarBarrios);
      mostrar();
    }).fail(function() {
      toast("FAIL Barrios");
    })

}

function guardarTabla2(tabla, select, value, id, nombre){  
  myDB.transaction(function(transaction) {
  var executeQuery = "INSERT INTO "+ tabla + " "+
                    "( "+select+" ) "+
                    "VALUES ( "+value+" )";  
      transaction.executeSql(executeQuery, [id,nombre]
      , function(tx, result) {
        //alert("Guardada la tabla: "+tabla);
      },
      function(error){
        //alert("error guardar: "+tabla);
     
      });
     })
}

function mostrar(){

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_relacion', [], function (tx, results) {
       $("#slc_familiar").html("");
       $("#slc_familiar").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#slc_familiar").append("<option value='"+results.rows.item(i).REL_CODIGO+"'>"+results.rows.item(i).REL_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM t_ciudadano', [], function (tx, results) {
       $("#ul_cabeza_familia").html("");
       $("#ul_miembro_familia").html("");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
         var nombre = results.rows.item(i).CIUD_APELLIDOS+" "+results.rows.item(i).CIUD_NOMBRES;
         var ci = results.rows.item(i).CIUD_CEDULA;
          $("#ul_cabeza_familia").append('<li onclick="enviarDatoCabeza(\' '+ci+' \', \' '+nombre+' \')" ><a>'+nombre+'</a></li> ');
          $("#ul_miembro_familia").append('<li onclick="enviarDatoMiembro(\' '+ci+' \', \' '+nombre+' \')" ><a>'+nombre+'</a></li> ');
       }
    }, null);
  })

  toast("Datos Mostrados Correctamente");
}

function enviarDatoCabeza(ci, nombre){
  document.getElementById("txt_ci_cabeza_familia").value=ci;
  document.getElementById("txt_cabeza_familia").value=nombre;
  document.getElementById("ul_cabeza_familia").style.display = "NONE";
}

function enviarDatoMiembro(ci, nombre){
  document.getElementById("txt_ci_miembro_familia").value=ci;
  document.getElementById("txt_miembro_familia").value=nombre;
  document.getElementById("ul_miembro_familia").style.display = "NONE";
}

function mostrarFamilia(){
  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM t_ciudadano_familia', [], function (tx, results) {
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#tableFamilia").append("<tr><th>"+results.rows.item(i).CIUDF_CABEZA_FAMILIA+"</th>"+
            "<td>"+results.rows.item(i).CIUDF_MIEMBRO_FAMILIA+"</td>"+
            "<td>"+results.rows.item(i).CIUDF_RELACION+"</td>"+
            "</tr>");
       }
    }, null);
  })
}

function activar(id){
  var varId = id;
  document.getElementById(varId).style.display = "block";
}


function guardarFamilia(){
  var txt_cabeza_familia = document.getElementById("txt_ci_cabeza_familia").value;
  var txt_miembro_familia = document.getElementById("txt_ci_miembro_familia").value;
  var slc_familiar = document.getElementById("slc_familiar").value;
 // alert(txt_cabeza_familia);
 // alert(txt_miembro_familia);
 // alert(slc_familiar);

  myDB.transaction(function(transaction) {
  var executeQuery = "INSERT INTO t_ciudadano_familia "+
                    "( CIUDF_CABEZA_FAMILIA, "+
                    " CIUDF_MIEMBRO_FAMILIA, "+
                    " CIUDF_RELACION ) "+
                    "VALUES ( ?,?,? )";  
      transaction.executeSql(executeQuery, [txt_cabeza_familia, txt_miembro_familia, slc_familiar]
      , function(tx, result) {
        toast("Registro Guardado Correctamente");
        //alert("Guardada la tabla: "+tabla);
      },
      function(error){
        //alert("error guardar: "+tabla);
        toast('Oops.  Error was '+error.message+' (Code '+error.code+')');     
      });
     })
}

function conexion() {
   // alert("entra");
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

   //alert('Connection type: ' + states[networkState]);
    //return networkState;
    return states[networkState];
}

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

  
  //document.getElementById('txt_fecha_actual').value=today;
  $('#txt_fecha_actual_familia').html(today);
}


function toast(message) {
    var $toast = $('<div class="ui-loader ui-overlay-shadow ui-body-e ui-corner-all"><h3>' + message + '</h3></div>');

    $toast.css({
        /*display: 'block', 
        background: '#fff',
        opacity: 0.90, 
        position: 'fixed',
        padding: '7px',
        'text-align': 'center',
        width: '270px',
        left: ($(window).width() - 284) / 2,
        top: $(window).height() / 2 - 20*/
        'min-width': '250px',
        'background-color': '#333',
        'color': '#fff',
        'text-align': 'center',
        padding: '2px',        
        display: 'block', 
        opacity: 0.70, 
        bottom: '30px',
        left: ($(window).width() - 284) / 2,
         top: $(window).height() / 1.12 - 20,
        'font-size': '13px' 
    });

    var removeToast = function(){
        $(this).remove();
    };

    $toast.click(removeToast);

    $toast.appendTo($.mobile.pageContainer).delay(2000);
    $toast.fadeOut(400, removeToast);
}


/*function cargarONRelacion(){
archivoValidacion =  "http://192.168.100.4/Geotactics/SIGCCapture/SIGCCapture_select_relacion_familiar.php?jsoncallback=?"
   $.getJSON( archivoValidacion, { 

    })
    .done(function(respuestaServer) { 

    if(respuestaServer.validacion_relacion == "ok"){
     var user= respuestaServer.datos_Relacion;
     var html = "";
     html+="<option value='-1'>PORFAVOR SELECCIONE</option>";
      for(var i=1 in respuestaServer.datos_Relacion) {
        html+="<option value='"+respuestaServer.datos_Relacion[i].ID+"'>"+respuestaServer.datos_Relacion[i].NOMBRE+"</option>";
      }
      $('#slc_familiar').html(html);
    }

    else{        
     alert("Error DPA");
    }
    })
    .fail(function() {
      alert("FAIL DPA");
    })

}*/