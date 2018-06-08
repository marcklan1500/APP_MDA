var myDB;
  //Open Database Connection
  document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
  myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", androidDatabaseImplementation: 2, location: 'default'});
      creartabla();
    mostrar();
  cargarFecha();

  /*NO VISIBLES*/
  document.getElementById("ul_responsable").style.display = "NONE";
  //document.getElementById("txt_ci_responsable").style.display = "NONE";
}

function creartabla(){
   //TIPO VIVIENDA
   var errorCrearTabla = "Tablas Creadas Sin Problemas";

   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_tipo_vivienda ('+
                            'TIPV_ID INT PRIMARY KEY NOT NULL ,'+
                            'TIPV_NOMBRE char(100));', [],
        function(tx, result) {
            //alert("Table created successfully c_tipo_vivienda");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table c_tipo_vivienda; ";
             //alert(error);
        });
    });
   //TENENCIA

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
//ORIGEN AGUA
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_agua_origen ('+
                            'AGUA_ID INT PRIMARY KEY NOT NULL ,'+
                            'AGUA_NOMBRE char(50));', [],
        function(tx, result) {
            //alert("Table created successfully c_tipo_vivienda");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table c_agua_origen; ";
             //alert(error);
        });
    });
//LUZ
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_luz ('+
                            'LUZ_ID INT PRIMARY KEY NOT NULL ,'+
                            'LUZ_NOMBRE char(45));', [],
        function(tx, result) {
            //alert("Table created successfully c_tipo_vivienda");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table c_luz; ";
             //alert(error);
        });
    });
//SERVICIO HIGIENICO
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_servicio_higienico ('+
                            'SERH_ID INT PRIMARY KEY NOT NULL ,'+
                            'SERH_NOMBRE char(45));', [],
        function(tx, result) {
            //alert("Table created successfully c_tipo_vivienda");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table c_servicio_higienico; ";
             //alert(error);
        });
    });
//TRATAMIENTO AGUAS
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_tratamiento_aguas ('+
                            'TRAT_ID INT PRIMARY KEY NOT NULL ,'+
                            'TRAT_NOMBRE char(50));', [],
        function(tx, result) {
            //alert("Table created successfully c_tipo_vivienda");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table c_tratamiento_aguas; ";
             //alert(error);
        });
    });


   toast(errorCrearTabla);

} 

function guardarCatalogoVivienda(){

  var errorGuardarCatalogoVivienda = "Se Crearon los Catalogos Sin Problemas";

  archivoValidacion =  "http://jaapp.geotactics.com.ec/SIGCCapture/SIGCCapture_select_catalogos_vivienda.php?jsoncallback=?"
   $.getJSON( archivoValidacion, { 

    })
    .done(function(respuestaServer) { 

    if(respuestaServer.validacion_tipo_vivienda == "ok"){
     var html = "";
      for(var i=0 in respuestaServer.datos_tipo_vivienda) {
        guardarTabla2("c_tipo_vivienda", "TIPV_ID, TIPV_NOMBRE", "?,?", respuestaServer.datos_tipo_vivienda[i].ID, respuestaServer.datos_tipo_vivienda[i].NOMBRE);
      }
    }
    if(respuestaServer.validacion_tenecia == "ok"){
     var html = "";
      for(var i=0 in respuestaServer.datos_tenecia) {
        guardarTabla2("c_propiedad", "PROP_CODIGO, PROP_NOMBRE", "?,?", respuestaServer.datos_tenecia[i].ID, respuestaServer.datos_tenecia[i].NOMBRE);
      }
    }
    if(respuestaServer.validacion_origen_agua == "ok"){
     var html = "";
      for(var i=0 in respuestaServer.datos_origen_agua) {
        guardarTabla2("c_agua_origen", "AGUA_ID, AGUA_NOMBRE", "?,?", respuestaServer.datos_origen_agua[i].ID, respuestaServer.datos_origen_agua[i].NOMBRE);
      }
    }
    if(respuestaServer.validacion_tipo_luz == "ok"){
     var html = "";
      for(var i=0 in respuestaServer.datos_tipo_luz) {
        guardarTabla2("c_luz", "LUZ_ID, LUZ_NOMBRE", "?,?", respuestaServer.datos_tipo_luz[i].ID, respuestaServer.datos_tipo_luz[i].NOMBRE);
      }
    }
    if(respuestaServer.validacion_servicio_higienico == "ok"){
     var html = "";
      for(var i=0 in respuestaServer.datos_servicio_higienico) {
        guardarTabla2("c_servicio_higienico", "SERH_ID, SERH_NOMBRE", "?,?", respuestaServer.datos_servicio_higienico[i].ID, respuestaServer.datos_servicio_higienico[i].NOMBRE);
      }
    }
    if(respuestaServer.validacion_tratamiento_aguas == "ok"){
     var html = "";
      for(var i=0 in respuestaServer.datos_tratamiento_aguas) {
        guardarTabla2("c_tratamiento_aguas", "TRAT_ID, TRAT_NOMBRE", "?,?", respuestaServer.datos_tratamiento_aguas[i].ID, respuestaServer.datos_tratamiento_aguas[i].NOMBRE);
      }
    }
    else{        
     toast("Error Barrios");
    }
    }).success(function(){
      toast(errorGuardarCatalogoVivienda);
      mostrar();
    }).fail(function() {
      toast("FAIL Tipo Vivienda");
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
  transaction.executeSql('SELECT * FROM c_agua_origen', [], function (tx, results) {
       $("#slc_origen_agua").html("");
       $("#slc_origen_agua").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       $("#slc_agua").html("");
       $("#slc_agua").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#slc_origen_agua").append("<option value='"+results.rows.item(i).AGUA_ID+"'>"+results.rows.item(i).AGUA_NOMBRE+"</option>");
          $("#slc_agua").append("<option value='"+results.rows.item(i).AGUA_ID+"'>"+results.rows.item(i).AGUA_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_luz', [], function (tx, results) {
       $("#slc_tipo_luz").html("");
       $("#slc_tipo_luz").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#slc_tipo_luz").append("<option value='"+results.rows.item(i).LUZ_ID+"'>"+results.rows.item(i).LUZ_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_servicio_higienico', [], function (tx, results) {
       $("#slc_servicio_higienico").html("");
       $("#slc_servicio_higienico").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#slc_servicio_higienico").append("<option value='"+results.rows.item(i).SERH_ID+"'>"+results.rows.item(i).SERH_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_tratamiento_aguas', [], function (tx, results) {
       $("#slc_tratamiento_agua").html("");
       $("#slc_tratamiento_agua").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#slc_tratamiento_agua").append("<option value='"+results.rows.item(i).TRAT_ID+"'>"+results.rows.item(i).TRAT_NOMBRE+"</option>");
       }
    }, null);
  })

  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM t_ciudadano', [], function (tx, results) {
       $("#ul_responsable").html("");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
         var nombre = results.rows.item(i).CIUD_APELLIDOS+" "+results.rows.item(i).CIUD_NOMBRES;
         var ci = results.rows.item(i).CIUD_CEDULA;
          $("#ul_responsable").append('<li onclick="enviarDatoResponsable(\' '+ci+' \', \' '+nombre+' \')" ><a>'+nombre+'</a></li> ');
       }
    }, null);
  })

  toast("Datos Mostrados Correctamente");
}

function enviarDatoResponsable(ci, nombre){
  document.getElementById("txt_ci_responsable").value=ci;
  document.getElementById("txt_responsable").value=nombre;
  document.getElementById("ul_responsable").style.display = "NONE";
}

function activar(id){
  var varId = id;
  document.getElementById(varId).style.display = "block";
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
  $('#txt_fecha_actual_vivienda').html(today);
}

function activar_camara(){
  /// CAMARA
  alert("activar");

  var onSuccess = function(position) {
    var lat=position.coords.latitude;
    var lang=position.coords.longitude;
    alert("Lat: "+lat);
    alert("Lang: "+lang);
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