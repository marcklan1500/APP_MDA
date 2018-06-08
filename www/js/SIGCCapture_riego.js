
var myDB;
  //Open Database Connection
  document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
  myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", androidDatabaseImplementation: 2, location: 'default'});
      creartabla();
      mostrar();
}

//---- CREAR TABLA
function creartabla(){
   //DIAS
   var errorCrearTabla = "Tablas Creadas Sin Problemas";
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_dias ('+
                            'dia_numero INT PRIMARY KEY NOT NULL,'+
                            'dia_nombre char(45));', [],
        function(tx, result) {
        }, 
        function(error) {
             errorCrearTabla +="Error occurred while creating the table c_dias; ";
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
   // Horarios riego
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS t_horariosriego ('+
                            'HOR_ID INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,'+
                            'HOR_DIA INT(11) ,'+
                            'HOR_HORA_INICIO time ,'+
                            'HOR_HORA_FIN time ,'+
                            'HOR_UPRO INT(11) ,'+
                            'HOR_CANTIDAD_HORAS INT(11) ,'+
                            'HOR_REGANTE varchar(10) );', [],
        function(tx, result) {
        }, 
        function(error) {
             errorCrearTabla +="Error occurred while creating the table t_horariosriego; ";
        });
    });
}
//---- MOSTRAR C_DIAS

//c_DIAS
function guardarCatalogosRiego(){
  var erroeGuardarCatalogos = "Se Crearon los Catalogos Sin Problemas";
  archivoValidacion =  "http://jaapp.geotactics.com.ec/SIGCCapture/SIGCCapture_select_catalogos_riego.php?jsoncallback=?"
   $.getJSON( archivoValidacion, { 

    })
    .done(function(respuestaServer) { 
    if(respuestaServer.validacionDias == "OK"){
     var user= respuestaServer.datosDias;
     var html = "";
      for(var i=0 in respuestaServer.datosDias) {
        guardarTabla2("c_dias", "dia_numero, dia_nombre", "?,?", respuestaServer.datosDias[i].dia_numero, respuestaServer.datosDias[i].dia_nombre);
      }
    }
    }).success(function(){
      toast(erroeGuardarCatalogos);
      mostrar();
    }).fail(function() {
      toast("FAIL CATALOGOS");
    })
}

function guardarTabla2(tabla, select, value, id, nombre){  
  myDB.transaction(function(transaction) {
  var executeQuery = "INSERT INTO "+ tabla + " "+
                    "( "+select+" ) "+
                    "VALUES ( "+value+" )";  
      transaction.executeSql(executeQuery, [id,nombre]
      , function(tx, result) {
       // alert("Guardada la tabla: "+tabla);
      },
      function(error){
      //  alert("error guardar: "+tabla);
     
      });
     })
}

function mostrar(){
  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM c_dias', [], function (tx, results) {
    $("#listb_dia").html("");
    $("#listb_dia").append("<option value='-1'>PORFAVOR SELECCIONE</option>");
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#listb_dia").append("<option value='"+results.rows.item(i).dia_numero+"'>"+results.rows.item(i).dia_nombre+"</option>");
       }
    }, null);
  })
  toast("Datos Mostrados Correctamente");
}

//******************************************
//************* Buscador Ciudadano ******************
//******************************************
function mostrarRegante(){
  var nomci=document.getElementById("txt_regante").value;
  $("#tableRegante").html("");
  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM `t_ciudadano` where CIUD_CEDULA LIKE \'%'+nomci+'%\' or CIUD_APELLIDOS LIKE \'%'+nomci+'%\';', [], function (tx, results) {
       var len = results.rows.length, i;
       for (i = 0; i < len; i++){
          $("#tableRegante").append("<tr onclick=selectCiudadano('"+results.rows.item(i).CIUD_CEDULA+"') ><th>"+results.rows.item(i).CIUD_CEDULA+"</th>"+
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

//****************************************
//************Guardar regantes     *******
//****************************************

function guardarHorariosRiego(){
  var ced_regante = document.getElementById("txt_ced_regante").value;//$( "txt_cedula" ).val();
  var u_productiva = document.getElementById("txt_uproductiva").value;
  var dia = document.getElementById("listb_dia").value;
  var hora_inicio = document.getElementById("txt_horaini").value;
  var hora_fin = document.getElementById("txt_horafin").value;
  var total_minutos = document.getElementById("txt_total_min").innerHTML;
//****************
  myDB.transaction(function(transaction) {
  var executeQuery = "INSERT INTO t_horariosriego "+
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


function cargarONRelacion(){
archivoValidacion =  "http://jaapp.geotactics.com.ec/SIGCCapture/SIGCCapture_select_catalogos_riego.php?jsoncallback=?"
   $.getJSON( archivoValidacion, { 
    })
    .done(function(respuestaServer) { 

    if(respuestaServer.validacionDias == "OK"){
     var user= respuestaServer.datosDias;
     var html = "";
     html+="<option value='-1'>PORFAVOR SELECCIONE</option>";
      for(var i=1 in respuestaServer.datosDias) {
        html+="<option value='"+respuestaServer.datosDias[i].dia_numero+"'>"+respuestaServer.datosDias[i].dia_nombre+"</option>";
      }
      $('#listb_dia').html(html);
    }

    else{        
     alert("Error DPA");
    }
    })
    .fail(function() {
      alert("FAIL DPA");
    })

}

function calculahoras(){

  var h_inicio=document.getElementById("txt_horaini").value.split(":");
  h_inicio=parseInt(h_inicio[0]);
  var h_fin=document.getElementById("txt_horafin").value.split(":");
  h_fin=parseInt(h_fin[0]);

  var m_inicio=document.getElementById("txt_horaini").value.split(":");
  m_inicio=parseInt(m_inicio[1]);
  var m_fin=document.getElementById("txt_horafin").value.split(":");
  m_fin=parseInt(m_fin[1]);
  var total_h=0;
  var total_m=0;
   if (isNaN(h_inicio) || isNaN(h_fin)) {
    
   }else{
    //condicional horas
    if(h_fin>h_inicio){
    total_h=h_fin-h_inicio-1;
    total_m=(60-m_inicio)+m_fin;
    document.getElementById("txt_total").innerHTML=((total_h*60)+total_m);
    }
      else if(h_fin==h_inicio){
      total_m=m_fin-m_inicio;
      if(m_fin<m_inicio){
         //HORA_FIN.clear();
         //HORA_INICIO.clear(); 
      document.getElementById("txt_total").innerHTML=0;    
      }else{
      document.getElementById("txt_total").innerHTML=total_m;
      }
    }
    else
    {
    total_h=(24+(h_fin*1))-h_inicio-1;
    total_m=(60-m_inicio)+m_fin;
    document.getElementById("txt_total").innerHTML=(total_h*60)+total_m;
    }
}
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
