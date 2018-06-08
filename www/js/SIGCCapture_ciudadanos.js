
var myDB;
  //Open Database Connection
  document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
  myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", androidDatabaseImplementation: 2, location: 'default'});
  creartabla();
  mostrar();
  cargarFecha();
  mostrarCiudadano();
}

function creartabla(){
   //GENERO
   var errorCrearTabla = "Tablas Creadas Sin Problemas";
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_genero ('+
                            'gen_id INT PRIMARY KEY NOT NULL ,'+
                            'gen_nombre char(20));', [],
        function(tx, result) {
            //alert("Table created successfully c_genero");

        }, 
        function(error) {
             errorCrearTabla +="Error occurred while creating the table c_genero; ";
             //alert(error);
        });
    });

   //ETNIA
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_etnia ('+
                            'ETN_CODIGO INT PRIMARY KEY NOT NULL  ,'+
                            'ETN_NOMBRE char(25));', [],
        function(tx, result) {
            //alert("Table created successfully c_etnia");
        }, 
        function(error) {
             errorCrearTabla +="Error occurred while creating the table c_etnia; ";
        });
    });

   // c_formacion
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_formacion ('+
                            'form_id INT PRIMARY KEY NOT NULL ,'+
                            'form_nombre char(30));', [],
        function(tx, result) {
            //alert("Table created successfully c_formacion");
        }, 
        function(error) {
             errorCrearTabla += "Error occurred while creating the table c_formacion; ";
        });
    });

   // c_actividad_economica
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_actividad_economica ('+
                            'ACTE_ID INT PRIMARY KEY NOT NULL ,'+
                            'ACTE_NOMBRE char(100),'+
                            'ACTE_DESCRIPCION char(200));', [],
        function(tx, result) {
            //alert("Table created successfully c_actividad_economica");
        }, 
        function(error) {
             errorCrearTabla += "Error occurred while creating the table c_actividad_economica; ";
        });
    });

   // c_estado_civil
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_estado_civil ('+
                            'est_id INT PRIMARY KEY NOT NULL ,'+
                            'est_nombre char(20));', [],
        function(tx, result) {
            //alert("Table created successfully c_estado_civil");
        }, 
        function(error) {
             errorCrearTabla += "Error occurred while creating the table c_estado_civil; ";
        });
    });

   // t_ordenamiento
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS t_ordenamiento ('+
                            'id INT PRIMARY KEY NOT NULL ,'+
                            'Contratante INT NOT NULL ,'+
                            'Contrato INT NOT NULL ,'+
                            'Provincia INT NOT NULL ,'+
                            'Canton INT NOT NULL ,'+
                            'Parroquia INT NOT NULL ,'+
                            'Comuna INT NOT NULL ,'+
                            'Barrio INT NOT NULL ,'+
                            'Id_Sector INT NOT NULL ,'+
                            'Sector char(50) ,'+
                            'Responsable char(10) ,'+
                            'Nombre_Parroquia char(30) ,'+
                            'Nombre_Barrio char(30) ,'+
                            'Nombre_Comuna char(30));', [],
        function(tx, result) {
           // alert("Table created successfully t_ordenamiento");
        }, 
        function(error) {
             errorCrearTabla += "Error occurred while creating the table t_ordenamiento; ";
        });
    });

   // c_barrios
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_barrios ('+
                            'BARR_ID INT PRIMARY KEY NOT NULL  ,'+
                            'BARR_NOMBRE char(100) ,'+
                            'BARR_PARROQUIA INT);', [],
        function(tx, result) {
           // alert("Table created successfully c_barrios");
        }, 
        function(error) {
             errorCrearTabla +="Error occurred while creating the table c_barrios; ";
        });
    });

   // c_provincia
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_provincia ('+
                            'PRO_CODIGO INT PRIMARY KEY NOT NULL  ,'+
                            'PRO_NOMBRE char(25) );', [],
        function(tx, result) {
           // alert("Table created successfully c_provincia");
        }, 
        function(error) {
             errorCrearTabla += "Error occurred while creating the table c_provincia; ";
        });
    });

   // c_ciudad
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_ciudad ('+
                            'CIU_CODIGO INT PRIMARY KEY NOT NULL  ,'+
                            'PRO_CODIGO INT NOT NULL ,'+
                            'CIU_NOMBRE char(25) );', [],
        function(tx, result) {
           // alert("Table created successfully c_ciudad");
        }, 
        function(error) {
             errorCrearTabla += "Error occurred while creating the table c_ciudad; ";
        });
    });


   // c_parroquia
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_parroquia ('+
                            'PARR_CODIGO INT PRIMARY KEY NOT NULL  ,'+
                            'CIU_CODIGO INT NOT NULL ,'+
                            'PARR_NOMBRE char(25) );', [],
        function(tx, result) {
          //  alert("Table created successfully c_parroquia");
        }, 
        function(error) {
             errorCrearTabla +="Error occurred while creating the table c_parroquia; ";
        });
    });

   // c_comuna
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_comuna ('+
                            'COM_ID INT PRIMARY KEY NOT NULL ,'+
                            'COM_NOMBRE char(100) ,'+
                            'PARR_CODIGO INT );', [],
        function(tx, result) {
          //  alert("Table created successfully c_parroquia");
        }, 
        function(error) {
             errorCrearTabla +="Error occurred while creating the table c_comuna; ";
        });
    });

   // Ciudadano
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS t_ciudadano ('+
                            'CIUD_CEDULA char(13) PRIMARY KEY NOT NULL ,'+
                            'CIUD_NOMBRES char(400) ,'+
                            'CIUD_APELLIDOS char(45) ,'+
                            'CIUD_GENERO INT ,'+
                            'CIUD_FECHANACIMIENTO date ,'+
                            'CIUD_NIVELEDUCATIVO INT ,'+
                            'CIUD_ETNIA INT ,'+
                            'CIUD_DISCAPACIDAD char(2) ,'+
                            'CIUD_NUM_CARNETCONADIS char(10) ,'+
                            'CIUD_DIRECCION char(100) ,'+
                            'CIUD_TELEFONO char(10) ,'+
                            'CIUD_ESTADOCIVIL char(11) ,'+
                            'CIUD_PROVINCIA INT ,'+
                            'CIUD_CANTON INT ,'+
                            'CIUD_PARROQUIA INT ,'+
                            'CIUD_BARRIO INT ,'+
                            'CIUD_COMUNA INT ,'+
                            'CIUD_PRODUCTOR char(2) ,'+
                            'CIUD_FECHA_REGISTRO date ,'+
                            'CIUD_TIENECOMUNA char(2) ,'+
                            'CIUD_ACTIVIDAD char(11) ,'+
                            'CIUD_TECNICO char(10) ,'+
                            'CIUD_SECTOR INT );', [],
        function(tx, result) {
          //  alert("Table created successfully c_parroquia");
        }, 
        function(error) {
             errorCrearTabla +="Error occurred while creating the table c_comuna; ";
        });
    });

 //  toast(errorCrearTabla);
   //guardarCatalogos();

}

//c_grnero   cbarrios
function guardarCatalogos(){

  var erroeGuardarCatalogos = "Se Crearon los Catalogos Sin Problemas";

  archivoValidacion =  "http://jaapp.geotactics.com.ec/SIGCCapture/SIGCCapture_select_catalogos.php?jsoncallback=?"
   $.getJSON( archivoValidacion, { 

    })
    .done(function(respuestaServer) { 

    if(respuestaServer.validacion == "OK"){
     var user= respuestaServer.datosGenero;
     var html = "";
      for(var i=0 in respuestaServer.datosGenero) {
        guardarTabla2("c_genero", "gen_id, gen_nombre", "?,?", respuestaServer.datosGenero[i].ID, respuestaServer.datosGenero[i].NOMBRE);
      }
    }
    if(respuestaServer.validacionEtnia == "OK"){
     var user= respuestaServer.datosEtnia;
     var html = "";
      for(var i=0 in respuestaServer.datosEtnia) {
        guardarTabla2("c_etnia", "ETN_CODIGO, ETN_NOMBRE", "?,?",respuestaServer.datosEtnia[i].ID, respuestaServer.datosEtnia[i].NOMBRE);
      }
    }
    if(respuestaServer.validacionNivelEducativo == "OK"){
     var user= respuestaServer.datosNivelEducativo;
     var html = "";
      for(var i=0 in respuestaServer.datosNivelEducativo) {
        guardarTabla2("c_formacion", "form_id,form_nombre","?,?", respuestaServer.datosNivelEducativo[i].ID, respuestaServer.datosNivelEducativo[i].NOMBRE);
      }
    }
    if(respuestaServer.validacionActividadEconomica == "OK"){
     var user= respuestaServer.datosActividadEconomica;
     var html = "";
      for(var i=0 in respuestaServer.datosActividadEconomica) {
        guardarTabla2("c_actividad_economica", "ACTE_ID,ACTE_NOMBRE","?,?",respuestaServer.datosActividadEconomica[i].ID, respuestaServer.datosActividadEconomica[i].NOMBRE);
      }
    }
    if(respuestaServer.validacionEstadoCivil == "OK"){
     var user= respuestaServer.datosEstadoCivil;
     var html = "";
      for(var i=0 in respuestaServer.datosEstadoCivil) {
        guardarTabla2("c_estado_civil", "est_id,est_nombre","?,?",respuestaServer.datosEstadoCivil[i].ID, respuestaServer.datosEstadoCivil[i].NOMBRE);
      }
    }
    if(respuestaServer.validacionBarrio == "OK"){
     var user= respuestaServer.datosBarrio;
     var html = "";
      for(var i=0 in respuestaServer.datosBarrio) {
        guardarTabla3("c_barrios", "BARR_ID,BARR_NOMBRE,BARR_PARROQUIA","?,?,?",respuestaServer.datosBarrio[i].ID, respuestaServer.datosBarrio[i].NOMBRE, respuestaServer.datosBarrio[i].BARR_PARROQUIA);
      }
    }
    if(respuestaServer.validacionSector == "OK"){
     var user= respuestaServer.datosSector;
     var html = "";
      for(var i=0 in respuestaServer.datosSector) {
        guardarTabla14("t_ordenamiento", 
          "id,Contratante, Contrato, Parroquia, Canton, Provincia, Comuna, Barrio, Id_Sector, Nombre_Parroquia, Responsable, Sector, Nombre_Barrio, Nombre_Comuna",
          "?,?,?,?,?,?,?,?,?,?,?,?,?,?",
          respuestaServer.datosSector[i].ID, respuestaServer.datosSector[i].CONTRATANTE,
          respuestaServer.datosSector[i].CONTRATO, respuestaServer.datosSector[i].PARROQUIA,
          respuestaServer.datosSector[i].CANTON, respuestaServer.datosSector[i].PROVINCIA,
          respuestaServer.datosSector[i].COMUNA, respuestaServer.datosSector[i].BARRIO,
          respuestaServer.datosSector[i].ID_SECTOR, respuestaServer.datosSector[i].NOMBRE_PARROQUIA,
          respuestaServer.datosSector[i].RESPONSABLE, respuestaServer.datosSector[i].SECTOR,
          respuestaServer.datosSector[i].NOMBRE_BARRIO, respuestaServer.datosSector[i].NOMBRE_COMUNA);
      }
    }
    else{        
     toast("Error CATALOGOS");
    }
    }).success(function(){
      toast(erroeGuardarCatalogos);
      guardarDpa();
    }).fail(function() {
      toast("FAIL CATALOGOS");
    })

}

//c_barrios , genero

function guardarDpa(){
  archivoValidacion =  "http://jaapp.geotactics.com.ec/SIGCCapture/SIGCCapture_select_dpa.php?jsoncallback=?"
   $.getJSON( archivoValidacion, { 

    })
    .done(function(respuestaServer) { 
    if(respuestaServer.validacion_provincia == "ok"){
     var user= respuestaServer.datos_provincia;
     var html = "";
      for(var i=0 in respuestaServer.datos_provincia) {
        guardarTabla2("c_provincia", "PRO_CODIGO, PRO_NOMBRE", "?,?", respuestaServer.datos_provincia[i].ID, respuestaServer.datos_provincia[i].NOMBRE);
      }
    }
    if(respuestaServer.validacion_canton == "ok"){
     var user= respuestaServer.datos_canton;
     var html = "";
      for(var i=0 in respuestaServer.datos_canton) {
        guardarTabla3("c_ciudad", "CIU_CODIGO, CIU_NOMBRE, PRO_CODIGO", "?,?,?", respuestaServer.datos_canton[i].ID, respuestaServer.datos_canton[i].NOMBRE, respuestaServer.datos_canton[i].ID_PROVINCIA);
      }
    }
    if(respuestaServer.validacion_parroquia == "ok"){
     var user= respuestaServer.datos_parroquia;
     var html = "";
      for(var i=0 in respuestaServer.datos_parroquia) {
        guardarTabla3("c_parroquia", "PARR_CODIGO, PARR_NOMBRE, CIU_CODIGO", "?,?,?", respuestaServer.datos_parroquia[i].ID, respuestaServer.datos_parroquia[i].NOMBRE, respuestaServer.datos_parroquia[i].ID_CANTON);
      }
    }
    if(respuestaServer.validacionComuna == "OK"){
     var user= respuestaServer.datosComuna;
     var html = "";
      for(var i=0 in respuestaServer.datosComuna) {
        guardarTabla3("c_comuna", "COM_ID,COM_NOMBRE,PARR_CODIGO","?,?,?",respuestaServer.datosComuna[i].ID, respuestaServer.datosComuna[i].NOMBRE, respuestaServer.datosComuna[i].PARR_CODIGO);
      }
    }
    else{        
     toast("Error DPA");
    }
    }).success(function(){
      toast("Se Crearon los DPA Sin Problemas");
      mostrar();
    }).fail(function() {
      toast("FAIL DPA");      
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

function guardarTabla3(tabla, select, value, id, nombre, id_p){  
  myDB.transaction(function(transaction) {
  var executeQuery = "INSERT INTO "+ tabla + " "+
                    "( "+select+" ) "+
                    "VALUES ( "+value+" )";  
      transaction.executeSql(executeQuery, [id,nombre, id_p]
      , function(tx, result) {
        //alert("Guardada la tabla: "+tabla);
      },
      function(error){
        //alert("error guardar: "+tabla);
     
      });
     })
}

function guardarTabla14(tabla, select, value, ID_SECTOR, SECTOR, ID, CONTRATANTE, CONTRATO, PROVINCIA, CANTON, PARROQUIA, COMUNA, BARRIO, RESPONSABLE, NOMBRE_PARROQUIA, NOMBRE_BARRIO, NOMBRE_COMUNA){  
  myDB.transaction(function(transaction) {
  var executeQuery = "INSERT INTO "+ tabla + " "+
                    "( "+select+" ) "+
                    "VALUES ( "+value+" )";  
      transaction.executeSql(executeQuery, [ID_SECTOR, SECTOR, ID, CONTRATANTE, CONTRATO, PROVINCIA, CANTON, PARROQUIA, COMUNA, BARRIO, RESPONSABLE, NOMBRE_PARROQUIA, NOMBRE_BARRIO, NOMBRE_COMUNA]
      , function(tx, result) {
        //alert("Guardada la tabla: "+tabla);
      },
      function(error){
      //  alert("error guardar: "+tabla);
     
      });
     })
}


function mostrar(){

   myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_provincia', [], function (tx, results) {
      $("#listb_provincia").html("");
      $("#listb_provincia").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#listb_provincia").append("<option value='"+results.rows.item(i).PRO_CODIGO+"'>"+results.rows.item(i).PRO_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_genero', [], function (tx, results) {
       $("#listb_genero").html("");
       $("#listb_genero").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#listb_genero").append("<option value='"+results.rows.item(i).gen_id+"'>"+results.rows.item(i).gen_nombre+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_etnia', [], function (tx, results) {
       $("#listb_etnia").html("");
       $("#listb_etnia").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#listb_etnia").append("<option value='"+results.rows.item(i).ETN_CODIGO+"'>"+results.rows.item(i).ETN_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_formacion', [], function (tx, results) {
       $("#listb_nivel_educativo").html("");
       $("#listb_nivel_educativo").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#listb_nivel_educativo").append("<option value='"+results.rows.item(i).form_id+"'>"+results.rows.item(i).form_nombre+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_actividad_economica', [], function (tx, results) {
       $("#listb_actividad_economica").html("");
       $("#listb_actividad_economica").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#listb_actividad_economica").append("<option value='"+results.rows.item(i).ACTE_ID+"'>"+results.rows.item(i).ACTE_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_estado_civil', [], function (tx, results) {
       $("#listb_estado_civil").html("");
       $("#listb_estado_civil").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#listb_estado_civil").append("<option value='"+results.rows.item(i).est_id+"'>"+results.rows.item(i).est_nombre+"</option>");
       }
    }, null);
  })

  toast("Datos Mostrados Correctamente");

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

  
  document.getElementById('txt_fecha_actual').value=today;
  $('#txt_fecha_actual_vivienda').html(today);
}

function guardarCiudadano(){
  var cedula = document.getElementById("txt_cedula").value;//$( "txt_cedula" ).val();
  var nombres = document.getElementById("txt_nombre").value;
  var apellidos = document.getElementById("txt_apellido").value;
  var genero = document.getElementById("listb_genero").value;
  var etnia = document.getElementById("listb_etnia").value;
  var fecha_nacimiento = document.getElementById("txt_fecha_nacimiento").value;
  var nivel_educativo = document.getElementById("listb_nivel_educativo").value;
  var actividad_economica = document.getElementById("listb_actividad_economica").value;

  var valor_cap_espe = "";
  var elem=document.getElementsByName('radio-choice-h-3');
  for(i=0;i<elem.length;i++){
    if (elem[i].checked) {
      valor_cap_espe = elem[i].value;
    }
  }
  
  var numero_conadis = document.getElementById("txt_cap_especial").value;
  var direccion = document.getElementById("txt_direccion").value;
  var telefono = document.getElementById("txt_telefono").value;
  var estado_civil = document.getElementById("listb_estado_civil").value;
  var provincia = document.getElementById("listb_provincia").value;
  var canton = document.getElementById("listb_canton").value;
  var parroquia = document.getElementById("listb_parroquia").value;
  var sector = document.getElementById("listb_sector").value;
  var fecha_actual = document.getElementById("txt_fecha_actual").value;
  

  //var pertenece_comuna = document.getElementById("txt_nombre").value;
  var valor_per_comuna = "";
  var elem=document.getElementsByName('radio-choice-h-2');
  for(i=0;i<elem.length;i++){
    if (elem[i].checked) {
      valor_per_comuna = elem[i].value;
    }
  }
  var comuna = document.getElementById("listb_comuna").value;

  //var producto_agricola = document.getElementById("txt_nombre").value;
  var valor_es_produ = "";
  var elem=document.getElementsByName('radio-choice-1');
  for(i=0;i<elem.length;i++){
    if (elem[i].checked) {
      valor_es_produ = elem[i].value;
    }
  }

  var barrio = document.getElementById("slc_barrio").value;

  myDB.transaction(function(transaction) {
  var executeQuery = "INSERT INTO t_ciudadano "+
                    "( CIUD_CEDULA,"+
                    "CIUD_NOMBRES,"+
                    "CIUD_APELLIDOS,"+
                    "CIUD_GENERO,"+
                    "CIUD_FECHANACIMIENTO,"+
                    "CIUD_NIVELEDUCATIVO,"+
                    "CIUD_ETNIA,"+
                    "CIUD_DISCAPACIDAD,"+
                    "CIUD_NUM_CARNETCONADIS,"+
                    "CIUD_DIRECCION,"+
                    "CIUD_TELEFONO,"+
                    "CIUD_ESTADOCIVIL,"+
                    "CIUD_PROVINCIA,"+
                    "CIUD_CANTON,"+
                    "CIUD_PARROQUIA,"+
                    "CIUD_BARRIO,"+
                    "CIUD_COMUNA,"+
                    "CIUD_PRODUCTOR,"+
                    "CIUD_FECHA_REGISTRO,"+
                    "CIUD_TIENECOMUNA,"+
                    "CIUD_ACTIVIDAD,"+
                    "CIUD_TECNICO,"+
                    "CIUD_SECTOR ) "+
                    "VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )";  
      transaction.executeSql(executeQuery, [cedula,nombres,apellidos,genero,fecha_nacimiento,nivel_educativo,etnia,valor_cap_espe,numero_conadis, direccion, telefono,estado_civil,provincia,canton,parroquia,barrio,comuna,valor_es_produ,fecha_actual,valor_per_comuna,actividad_economica,'1720929593',sector]
      , function(tx, result) {
        toast("Registro Guardado Correctamente");
      },
      function(error){
        toast('Oops.  Error was '+error.message+' (Code '+error.code+')');
     
      });
     })

}

function mostrarCiudadano(){
  var nomci=document.getElementById("txt_ciudadano").value;
  $("#tableCiudadanos").html("");
  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM `t_ciudadano` where CIUD_PRODUCTOR=\'SI\' AND CIUD_CEDULA LIKE \'%'+nomci+'%\' or CIUD_APELLIDOS LIKE \'%'+nomci+'%\' ;', [], function (tx, results) {
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#tableCiudadanos").append("<tr onclick=selectCiudadano('"+results.rows.item(i).CIUD_CEDULA+"') ><th>"+results.rows.item(i).CIUD_CEDULA+"</th>"+
            "<td>"+results.rows.item(i).CIUD_NOMBRES+"</td>"+
            "<td>"+results.rows.item(i).CIUD_APELLIDOS+"</td>"+
            "<td>"+results.rows.item(i).CIUD_GENERO+"</td>"+
            "<td>"+results.rows.item(i).CIUD_FECHANACIMIENTO+"</td>"+
            "<td>"+results.rows.item(i).CIUD_NIVELEDUCATIVO+"</td>"+
            "<td>"+results.rows.item(i).CIUD_ETNIA+"</td>"+
            "<td>"+results.rows.item(i).CIUD_DISCAPACIDAD+"</td>"+
            "<td>"+results.rows.item(i).CIUD_NUM_CARNETCONADIS+"</td>"+
            "<td>"+results.rows.item(i).CIUD_DIRECCION+"</td>"+
            "<td>"+results.rows.item(i).CIUD_TELEFONO+"</td>"+
            "<td>"+results.rows.item(i).CIUD_ESTADOCIVIL+"</td>"+
            "<td>"+results.rows.item(i).CIUD_PROVINCIA+"</td>"+
            "<td>"+results.rows.item(i).CIUD_CANTON+"</td>"+
            "<td>"+results.rows.item(i).CIUD_PARROQUIA+"</td>"+
            "<td>"+results.rows.item(i).CIUD_BARRIO+"</td>"+
            "<td>"+results.rows.item(i).CIUD_COMUNA+"</td>"+
            "<td>"+results.rows.item(i).CIUD_PRODUCTOR+"</td>"+
            "<td>"+results.rows.item(i).CIUD_FECHA_REGISTRO+"</td>"+
            "<td>"+results.rows.item(i).CIUD_TIENECOMUNA+"</td>"+
            "<td>"+results.rows.item(i).CIUD_ACTIVIDAD+"</td>"+
            "<td>"+results.rows.item(i).CIUD_TECNICO+"</td>"+
            "<td>"+results.rows.item(i).CIUD_SECTOR+"</td>"+
            "</tr>");
       }
    }, null);
  })
}

function selectCiudadano(cedula){  
  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM `t_ciudadano` where CIUD_CEDULA= \''+cedula+'\';', [], function (tx, results) {
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          document.getElementById("idDos").click();
          document.getElementById("txt_cedula").value=results.rows.item(i).CIUD_CEDULA;
          document.getElementById("txt_nombre").value=results.rows.item(i).CIUD_NOMBRES;
          document.getElementById("txt_apellido").value=results.rows.item(i).CIUD_APELLIDOS;

          $('#listb_genero').val(results.rows.item(i).CIUD_GENERO).attr('selected', true).siblings('option').removeAttr('selected');
          $('#listb_genero').selectmenu("refresh", true);

          $('#listb_etnia').val(results.rows.item(i).CIUD_ETNIA).attr('selected', true).siblings('option').removeAttr('selected');
          $('#listb_etnia').selectmenu("refresh", true);
          
          document.getElementById("txt_fecha_nacimiento").value=results.rows.item(i).CIUD_FECHANACIMIENTO;

          $('#listb_nivel_educativo').val(results.rows.item(i).CIUD_NIVELEDUCATIVO).attr('selected', true).siblings('option').removeAttr('selected');
          $('#listb_nivel_educativo').selectmenu("refresh", true);

          $('#listb_actividad_economica').val(results.rows.item(i).CIUD_ACTIVIDAD).attr('selected', true).siblings('option').removeAttr('selected');
          $('#listb_actividad_economica').selectmenu("refresh", true);

          var valor_cap_espe = results.rows.item(i).CIUD_DISCAPACIDAD;
          if(valor_cap_espe == "SI"){
            document.getElementsByName('radio-choice-h-3a').checked = true;
            document.getElementsByName('radio-choice-h-3b').checked = false;
          }else if(valor_cap_espe == "NO"){
            document.getElementsByName('radio-choice-h-3a').checked = false;
            document.getElementsByName('radio-choice-h-3b').checked = true;
          }
          
          document.getElementById("txt_cap_especial").value = results.rows.item(i).CIUD_NUM_CARNETCONADIS;
          document.getElementById("txt_direccion").value = results.rows.item(i).CIUD_DIRECCION;
          document.getElementById("txt_telefono").value = results.rows.item(i).CIUD_TELEFONO;

          $('#listb_provincia').val(results.rows.item(i).CIUD_PROVINCIA).attr('selected', true).siblings('option').removeAttr('selected');
          $('#listb_provincia').selectmenu("refresh", true);

          $('#listb_canton').val(results.rows.item(i).CIUD_CANTON).attr('selected', true).siblings('option').removeAttr('selected');
          $('#listb_canton').selectmenu("refresh", true);

          $('#listb_parroquia').val(results.rows.item(i).CIUD_PARROQUIA).attr('selected', true).siblings('option').removeAttr('selected');
          $('#listb_parroquia').selectmenu("refresh", true);

          $('#listb_sector').val(results.rows.item(i).CIUD_SECTOR).attr('selected', true).siblings('option').removeAttr('selected');
          $('#listb_sector').selectmenu("refresh", true);          

          //var pertenece_comuna = document.getElementById("txt_nombre").value;
          var valor_per_comuna = results.rows.item(i).CIUD_TIENECOMUNA;
          if(valor_per_comuna == "SI"){
            document.getElementsByName('radio-choice-h-2a').checked = true;
            document.getElementsByName('radio-choice-h-2b').checked = false;
          }else if(valor_per_comuna == "NO"){
            document.getElementsByName('radio-choice-h-2a').checked = false;
            document.getElementsByName('radio-choice-h-2b').checked = true;
          }

          $('#listb_comuna').val(results.rows.item(i).CIUD_COMUNA).attr('selected', true).siblings('option').removeAttr('selected');
          $('#listb_comuna').selectmenu("refresh", true); 


          //var producto_agricola = document.getElementById("txt_nombre").value;
          var valor_es_produ = results.rows.item(i).CIUD_TIENECOMUNA;
          if(valor_es_produ == "SI"){
            document.getElementsByName('radio-choice-1a').checked = true;
            document.getElementsByName('radio-choice-1b').checked = false;
          }else if(valor_es_produ == "NO"){
            document.getElementsByName('radio-choice-1a').checked = false;
            document.getElementsByName('radio-choice-1b').checked = true;
          }

          var valor_es_produ = "";
          var elem=document.getElementsByName('radio-choice-1');
          for(i=0;i<elem.length;i++){
            if (elem[i].checked) {
              valor_es_produ = elem[i].value;
            }
          }

          $('#slc_barrio').val(results.rows.item(i).CIUD_BARRIO).attr('selected', true).siblings('option').removeAttr('selected');
          $('#slc_barrio').selectmenu("refresh", true); 
       }
    }, null);
  })
}

function toast(message) {
    var $toast = $('<div class="ui-loader ui-overlay-shadow ui-body-e ui-corner-all"><h3>' + message + '</h3></div>');

    $toast.css({
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

function activar(id){
  var varId = id;
  console.log(varId);
  document.getElementById(varId).style.display = "none";
}

function desactivar(id){
  var varId = id;
  console.log(varId);
  document.getElementById(varId).style.display = "block";
}

function cargarCanton(){
  var id_prov = document.getElementById("listb_provincia").value;

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_ciudad where PRO_CODIGO= '+id_prov+' ', [], function (tx, results) {
    $("#listb_canton").html("");
    $("#listb_canton").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#listb_canton").append("<option value='"+results.rows.item(i).CIU_CODIGO+"'>"+results.rows.item(i).CIU_NOMBRE+"</option>");
       }
    }, null);
  })

}

function cargarParroquia(){
  var id_canton = document.getElementById("listb_canton").value;

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_parroquia where CIU_CODIGO= '+id_canton+' ', [], function (tx, results) {
       $("#listb_parroquia").html("");
       $("#listb_parroquia").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#listb_parroquia").append("<option value='"+results.rows.item(i).PARR_CODIGO+"'>"+results.rows.item(i).PARR_NOMBRE+"</option>");
       }
    }, null);
  })
}

function cargarComuna_Barrios(){
  var id_parroquia = document.getElementById("listb_parroquia").value;

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_comuna where PARR_CODIGO= '+id_parroquia+' ', [], function (tx, results) {
       $("#listb_comuna").html("");
       $("#listb_comuna").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#listb_comuna").append("<option value='"+results.rows.item(i).COM_ID+"'>"+results.rows.item(i).COM_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_barrios where BARR_PARROQUIA= '+id_parroquia+' ', [], function (tx, results) {
       $("#slc_barrio").html("");
       $("#slc_barrio").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#slc_barrio").append("<option value='"+results.rows.item(i).BARR_ID+"'>"+results.rows.item(i).BARR_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM t_ordenamiento where Parroquia='+id_parroquia+' ', [], function (tx, results) {
       $("#listb_sector").html("");
       $("#listb_sector").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#listb_sector").append("<option value='"+results.rows.item(i).Id_Sector+"'>"+results.rows.item(i).Sector+"</option>");
       }
    }, null);
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
  