var myDB;
//Open Database Connection
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
  myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", androidDatabaseImplementation: 2, location: 'default'});
  creartabla();
    mostrar();
  
  /*NO VISIBLES*/
  document.getElementById("ul_regante").style.display = "NONE";

}

function creartabla(){

   var errorCrearTabla = "Tablas Creadas Sin Problemas";
   
//PROPIEDAD
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_propiedad ('+
                            'PROP_CODIGO INT PRIMARY KEY NOT NULL ,'+
                            'PROP_NOMBRE char(25));', [],
        function(tx, result) {
            //alert("Table created successfully c_tipo_vivienda");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table c_propiedad; ";
             //alert(error);
        });
    });
   //TIPORIEGO

   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_tiporiego ('+
                            'TIPR_ID INT PRIMARY KEY NOT NULL ,'+
                            'TIPR_NOMBRE char(45));', [],
        function(tx, result) {
          //  alert("Table created successfully c_tipo_riego");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table c_tiporiego; ";
             //alert(error);
        });
    });
//JUNTAAGUAS

   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_juntaagua ('+
                            'JUNT_ID INT PRIMARY KEY NOT NULL ,'+
                            'JUNT_NOMBRE char(45));', [],
        function(tx, result) {
            //alert("Table created successfully c_junta");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table c_juntaagua; ";
             //alert(error);
        });
    });
//CAJAS
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS t_cajas ('+
                            'CAJ_ID INT PRIMARY KEY NOT NULL ,'+
                            'CAJ_NOMBRE char(100));', [],
        function(tx, result) {
        //    alert("Table created successfully c_tipo_vivienda");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table t_cajas; ";
             //alert(error);
        });
    });
//RAMALES
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS t_ramales ('+
                            'RAM_ID INT PRIMARY KEY NOT NULL ,'+
                            'RAM_NOMBRE char(50));', [],
        function(tx, result) {
           // alert("Table created successfully c_tipo_vivienda");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table t_ramales; ";
             //alert(error);
        });
    });

   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS t_unidad_productiva ('+
                            'PRODR_CI char(13),'+
                            'UPRO_NOMBRE char(100),'+
                            'UPRO_PROVINCIA char(10),'+
                            'UPRO_CIUDAD char(25),'+
                            'UPRO_PARROQUIA char(30),'+
                            'UPRO_COMUNIDAD char(30),'+
                            'UPRO_COORX text,'+
                            'UPRO_COORY text,'+
                            'UPRO_PROPIEDAD char(30),'+
                             'UPRO_AREAPROPIEADAD text,'+
                            'UPRO_AREATOTAL text,'+
                            'UPRO_ESPEJOS_AGUA char(2),'+
                            'UPRO_AREA_ESPEJOS text,'+
                            'UPRO_RIEGO_TIPOSISTEMA int,'+
                            'UPRO_JUNTAAGUA int,'+
                            'UPRO_FOTO char(500),'+
                            'UPRO_CAJA int,'+
                            'UPRO_RAMAL int, '+
                            'RAM_NOMBRE char(50));', [],
        function(tx, result) {
           // alert("Table created successfully c_tipo_vivienda");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table t_ramales; ";
             //alert(error);
        });
    });


   toast(errorCrearTabla);

} 

function guardarCatalogoUnidadProductiva(){

  var errorGuardarCatalogoVivienda = "Se Crearon los Catalogos Sin Problemas";

  archivoValidacion =  "http://jaapp.geotactics.com.ec/SIGCCapture/SIGCCapture_select_unidad_productiva.php?jsoncallback=?"
   $.getJSON( archivoValidacion, { 

    })
    .done(function(respuestaServer) { 

    if(respuestaServer.validacion_tenencia == "ok"){
     var html = "";
      for(var i=0 in respuestaServer.datos_tenencia) {
        guardarTabla2("c_propiedad", "PROP_CODIGO, PROP_NOMBRE", "?,?", respuestaServer.datos_tenencia[i].ID, respuestaServer.datos_tenencia[i].NOMBRE);
      }
    }
    if(respuestaServer.validacion_sistema_riego == "ok"){
     var html = "";
      for(var i=0 in respuestaServer.datos_sistema_riego) {
        guardarTabla2("c_tiporiego", "TIPR_ID, TIPR_NOMBRE", "?,?", respuestaServer.datos_sistema_riego[i].ID, respuestaServer.datos_sistema_riego[i].NOMBRE);
      }
    }
    if(respuestaServer.validacion_junta_agua == "ok"){
     var html = "";
      for(var i=0 in respuestaServer.datos_junta_agua) {
        guardarTabla2("c_juntaagua", "JUNT_ID, JUNT_NOMBRE", "?,?", respuestaServer.datos_junta_agua[i].ID, respuestaServer.datos_junta_agua[i].NOMBRE);
      }
    }
    if(respuestaServer.validacion_caja == "ok"){
     var html = "";
      for(var i=0 in respuestaServer.datos_caja) {
        guardarTabla2("t_cajas", "CAJ_ID, CAJ_NOMBRE", "?,?", respuestaServer.datos_caja[i].ID, respuestaServer.datos_caja[i].NOMBRE);
      }
    }
    if(respuestaServer.validacion_ramal == "ok"){
     var html = "";
      for(var i=0 in respuestaServer.datos_ramal) {
        guardarTabla2("t_ramales", "RAM_ID, RAM_NOMBRE", "?,?", respuestaServer.datos_ramal[i].ID, respuestaServer.datos_ramal[i].NOMBRE);
      }
    }
    else{        
     toast("Error Barrios");
    }
    }).success(function(){
      toast(errorGuardarCatalogoVivienda);
      guardarDpa();
    }).fail(function() {
      toast("FAIL Tipo Vivienda");
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
  transaction.executeSql('SELECT * FROM c_tipo_vivienda', [], function (tx, results) {
       $("#slc_vivienda").html("");
       $("#slc_vivienda").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#slc_vivienda").append("<option value='"+results.rows.item(i).TIPV_ID+"'>"+results.rows.item(i).TIPV_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_propiedad', [], function (tx, results) {
       $("#slc_tenencia").html("");
       $("#slc_tenencia").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#slc_tenencia").append("<option value='"+results.rows.item(i).PROP_CODIGO+"'>"+results.rows.item(i).PROP_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_tiporiego', [], function (tx, results) {
       $("#slc_sistema_riego").html("");
       $("#slc_sistema_riego").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#slc_sistema_riego").append("<option value='"+results.rows.item(i).TIPR_ID+"'>"+results.rows.item(i).TIPR_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_juntaagua', [], function (tx, results) {
       $("#slc_junta_agua").html("");
       $("#slc_junta_agua").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#slc_junta_agua").append("<option value='"+results.rows.item(i).JUNT_ID+"'>"+results.rows.item(i).JUNT_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM t_cajas', [], function (tx, results) {
       $("#slc_caja").html("");
       $("#slc_caja").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#slc_caja").append("<option value='"+results.rows.item(i).CAJ_ID+"'>"+results.rows.item(i).CAJ_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM t_ramales', [], function (tx, results) {
       $("#slc_ramal").html("");
       $("#slc_ramal").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#slc_ramal").append("<option value='"+results.rows.item(i).RAM_ID+"'>"+results.rows.item(i).RAM_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM t_ciudadano where CIUD_PRODUCTOR=\'SI\' ', [], function (tx, results) {
       $("#ul_regante").html("");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
         var nombre = results.rows.item(i).CIUD_APELLIDOS+" "+results.rows.item(i).CIUD_NOMBRES;
         var ci = results.rows.item(i).CIUD_CEDULA;
          $("#ul_regante").append('<li onclick="enviarDatoResponsable(\' '+ci+' \', \' '+nombre+' \')" ><a>'+nombre+'</a></li> ');
       }
    }, null);
  })

  toast("Datos Mostrados Correctamente");
}

function enviarDatoResponsable(ci, nombre){
  alert(ci);
  document.getElementById("txt_ci_regante").value=ci;
  document.getElementById("txt_regante").value=nombre;
  document.getElementById("ul_regante").style.display = "NONE";
}


function mostrarUnidadProductiva(){
  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM t_unidad_productiva', [], function (tx, results) {
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#tableUnidad").append("<tr><th>"+results.rows.item(i).PRODR_CI+"</th>"+
            "<td>"+results.rows.item(i).UPRO_NOMBRE+"</td>"+
            
            "</tr>");
       }
    }, null);
  })
}

function guardarUnidadProductiva(){
  var txt_ci_regante = document.getElementById("txt_ci_regante").value;
  var txt_regante = document.getElementById("txt_regante").value;
  var txt_nombre_up = document.getElementById("txt_nombre_up").value;
  var listb_provincia = document.getElementById("listb_provincia").value;
  var listb_canton = document.getElementById("listb_canton").value;
  var listb_parroquia = document.getElementById("listb_parroquia").value;
  var listb_comuna = document.getElementById("listb_comuna").value;
  var slc_vivienda = document.getElementById("slc_vivienda").value;
  var coor_X = document.getElementById("txt_coordenada_x").value;
  var coor_Y = document.getElementById("txt_coordenada_y").value;
  var slc_tenencia = document.getElementById("slc_tenencia").value;
  var txt_area_propiedad = document.getElementById("txt_area_propiedad").value;
  var txt_area_total = document.getElementById("txt_area_total").value;

  var valor_espejo_agua = "";
  var elem=document.getElementsByName('radio-choice-h-1');
  for(i=0;i<elem.length;i++){
    if (elem[i].checked) {
      valor_espejo_agua = elem[i].value;
    }
  }

  var txt_area_espejos = document.getElementById("txt_area_espejos").value;
  var slc_sistema_riego = document.getElementById("slc_sistema_riego").value;
  var slc_junta_agua = document.getElementById("slc_junta_agua").value;
  var slc_caja = document.getElementById("slc_caja").value;
  var slc_ramal = document.getElementById("slc_ramal").value;

  myDB.transaction(function(transaction) {
  var executeQuery = "INSERT INTO t_unidad_productiva "+
                    "( PRODR_CI,"+
                     "UPRO_NOMBRE,"+
                     "UPRO_PROVINCIA,"+
                     "UPRO_CIUDAD,"+
                     "UPRO_PARROQUIA,"+
                     "UPRO_COMUNIDAD,"+
                     "UPRO_COORX,"+
                     "UPRO_COORY,"+
                     "UPRO_AREAPROPIEADAD,"+
                     "UPRO_AREATOTAL,"+
                     "UPRO_ESPEJOS_AGUA,"+
                     "UPRO_AREA_ESPEJOS,"+
                     "UPRO_RIEGO_TIPOSISTEMA,"+
                     "UPRO_JUNTAAGUA,"+
                     "UPRO_CAJA,"+
                     "UPRO_RAMAL, "+
                     "RAM_NOMBRE "+
                    " ) "+
                    "VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )";  
      transaction.executeSql(executeQuery, [txt_ci_regante,txt_regante,listb_provincia,listb_canton,listb_parroquia,listb_comuna,coor_X,coor_Y,txt_area_propiedad,txt_area_total,valor_espejo_agua,txt_area_espejos,slc_sistema_riego,slc_junta_agua,slc_caja,slc_ramal,txt_nombre_up]
      , function(tx, result) {
        toast("Guardada Correctamente");
      },
      function(error){
        toast("Error al Guardar");
     
      });
     })

  }

function activar(id){
  var varId = id;
  document.getElementById(varId).style.display = "block";
}

function desactivar(id){
  var varId = id;
  document.getElementById(varId).style.display = "NONE";
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

function activar_camara(){
  /// CAMARA  
  var onSuccess = function(position) {
    var lat=position.coords.latitude;
    var lang=position.coords.longitude;
    //Asignar valores a los txt
    document.getElementById('txt_coordenada_x').value = lat;
    document.getElementById('txt_coordenada_y').value = lang;
    //Google Maps
    /*var myLatlng = new google.maps.LatLng(lat,lang);
    var valor=0;
    var mapOptions = {zoom: 18,center: myLatlng}
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new google.maps.Marker({position: myLatlng,map: map});*/
  }

  function onError(error) {
    toast('code: ' + error.code );
    //'message: ' + error.message + '\n');
  }
  navigator.geolocation.getCurrentPosition(onSuccess, onError);

  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 100, targetWidth: 1153, targetHeight: 385, 
                  allowEdit: false,correctOrientation: true, destinationType: navigator.camera.DestinationType.FILE_URI});
}
//FUNCIONES
function onPhotoDataSuccess(imageData) {
  //TAMAÑO DE FOTO
  /* window.resolveLocalFileSystemURI(imageData, function(fileEntry) {
      fileEntry.file(function(fileObj) {
      console.log("Size = " + fileObj.size);
      peso=fileObj.size;
    });
  });
  //MOSTRAR*/
  var photo = document.getElementById('photo');
  photo.style.display = 'block';
  photo.src =imageData;
  //fichero=imageData;
  // alert("el fichero es:"+fichero);
  /*var sendPhoto = document.getElementById('sendPhoto');
  sendPhoto.style.display = 'block';*/
}
 
function onFail(message) {
  //  alert('Failed because: ' + message);
}

function cargarCanton(){

  var idProvincia = document.getElementById("listb_provincia").value;

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_ciudad where PRO_CODIGO='+idProvincia+' ', [], function (tx, results) {
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

  var idCanton = document.getElementById("listb_canton").value;
  
  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_parroquia where CIU_CODIGO='+idCanton+' ', [], function (tx, results) {
       $("#listb_parroquia").html("");
       $("#listb_parroquia").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#listb_parroquia").append("<option value='"+results.rows.item(i).PARR_CODIGO+"'>"+results.rows.item(i).PARR_NOMBRE+"</option>");
       }
    }, null);
  })
}

function cargarComuna(){

  var idParroquia = document.getElementById("listb_parroquia").value;

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_comuna where PARR_CODIGO='+idParroquia+' ', [], function (tx, results) {
       $("#listb_comuna").html("");
       $("#listb_comuna").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#listb_comuna").append("<option value='"+results.rows.item(i).COM_ID+"'>"+results.rows.item(i).COM_NOMBRE+"</option>");
       }
    }, null);
  })
  
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