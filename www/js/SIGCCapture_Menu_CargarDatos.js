
//---- CREAR BDD
var myDB;
//Open Database Connection
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", androidDatabaseImplementation: 2, location: 'default'});
//alert("Base de datos creada");
//if(conexion()==Connection.WIFI && localStorage.getItem("cargardatos")!=1){
     var $this = $( this ),
            theme = "a",
            msgText ="Cargando Recursos",
            textVisible =true,
            textonly = false;
            html ="";
        $.mobile.loading( "show", {
                text: msgText,
                textVisible: textVisible,
                theme: theme,
                textonly: textonly,
                html: html
        });
    creartabla();
    GuardarDatos();
//}

}

//---- CREAR TABLA
function creartabla(){
  //USUARIO
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS t_usuarios (cedula text primary key, nombre text,apellido text,foto text,mail text,celular text,direccion text ,password text,brigada text,levantamiento text,contratonumero text,estado text)', [],
        function(tx, result) {
         //  alert("Tabla creada exitosamente");
           //cargarCatalogo();
           //cargarDPA();
        }, 
        function(error) {
        //   alert("Error occurred while creating the table.");
        });
    });
//GENERO
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
   //TIPO PRODUCCION
   var errorCrearTabla = "Tablas Creadas Sin Problemas";

   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_tipo_produccion ('+
                            'TPROD_ID int primary key,'+
                            'TPROD_TIPO char(60));', [],
        function(tx, result) {
            //alert("Table created successfully c_relacion");

        }, 
        function(error) {
            
             //alert(error);
        });
    });

        //PRODUCTO
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS t_producto ('+
                          'PRTO_CODIGO int primary key,'+
                          'PRTO_NOMBRE TEXT,'+
                          'PRTO_TIPO_PROD int );', [],
        function(tx, result) {
            //alert("Table created successfully c_relacion");

        }, 
        function(error) {
   
             //alert(error);
        });
    });
//ESTADO PRODUCCION
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_estado ('+
                            'EST_CODIGO int primary key,'+
                            'EST_NOMBRE char(25));', [],
        function(tx, result) {
            //alert("Table created successfully c_relacion");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table c_estado; ";
             //alert(error);
        });
    });
  //DIAS
   var errorCrearTabla = "Tablas Creadas Sin Problemas";
   myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS c_dias ('+
                            'dia_numero INT PRIMARY KEY NOT NULL,'+
                            'dia_nombre char(45));', [],
        function(tx, result) {
          //  alert("Table created successfully c_dias");

        }, 
        function(error) {
             errorCrearTabla +="Error occurred while creating the table c_dias; ";
           //  alert(error);
        });
    });
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
            //alert("Table created successfully c_tipo_riego");

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
         //   alert("Table created successfully c_tipo_vivienda");

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
          //  alert("Table created successfully c_tipo_vivienda");

        }, 
        function(error) {
             errorCrearTabla ="Error occurred while creating the table t_ramales; ";
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
//TIPO VIVIENDA
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
}
function GuardarDatos(){

//CATALOGOS
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
     
                                  //DPA
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
                                     
                                       //RELACION
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
                                          
                                          //PRODUCCION
                                                    var errorGuardarProduccion = "Se Crearon los Catalogos Sin Problemas";

                                                  archivoValidacion =  "http://jaapp.geotactics.com.ec/SIGCCapture/SIGCCapture_select_produccion.php?jsoncallback=?"
                                                   $.getJSON( archivoValidacion, { 

                                                    })
                                                    .done(function(respuestaServer) { 

                                                    if(respuestaServer.validacion_tipo_produccion == "ok"){
                                                     var user= respuestaServer.datos_tipo_produccion;
                                                     var html = "";
                                                      for(var i=0 in respuestaServer.datos_tipo_produccion) {
                                                        guardarTabla2("c_tipo_produccion", "TPROD_ID, TPROD_TIPO", "?,?", respuestaServer.datos_tipo_produccion[i].ID, respuestaServer.datos_tipo_produccion[i].NOMBRE);
                                                      }
                                                    }
                                                    if(respuestaServer.validacion_producto == "ok"){
                                                     var user= respuestaServer.datos_producto;
                                                     var html = "";
                                                      for(var i=0 in respuestaServer.datos_producto) {
                                                        guardarTabla3("t_producto", "PRTO_CODIGO, PRTO_NOMBRE, PRTO_TIPO_PROD", "?,?,?", respuestaServer.datos_producto[i].ID, respuestaServer.datos_producto[i].NOMBRE, respuestaServer.datos_producto[i].TIPO);
                                                      }
                                                    }
                                                    if(respuestaServer.validacion_estado == "ok"){
                                                     var user= respuestaServer.datos_estado;
                                                     var html = "";
                                                      for(var i=0 in respuestaServer.datos_estado) {
                                                        guardarTabla2("c_estado", "EST_CODIGO, EST_NOMBRE", "?,?", respuestaServer.datos_estado[i].ID, respuestaServer.datos_estado[i].NOMBRE);
                                                      }
                                                    }
                                                    else{        
                                                     toast("Error Barrios");
                                                    }
                                                    }).success(function(){
                                                   
                                                            //riego
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
                                                                 
                                                                   //UPRO
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
                                                                                 
                                                                                        //VIVIENDA

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
                                                                                               $.mobile.loading( "hide" );
                                                                                              localStorage.setItem("cargardatos",1);
                                                                                            //  toast(errorGuardarCatalogoVivienda);
                                                                                           //   mostrar();
                                                                                            }).fail(function() {
                                                                                           //  toast("FAIL Tipo Vivienda");
                                                                                            })
                                                                                }).fail(function() {
                                                                                  toast("FAIL Tipo Vivienda");
                                                                                })
                                                                }).fail(function() {
                                                                  toast("FAIL CATALOGOS");
                                                                })

                                                    }).fail(function() {
                                                      toast("FAIL Barrios");
                                                    })
                                        }).fail(function() {
                                          toast("FAIL Barrios");
                                        })
                        }).fail(function() {
                          toast("FAIL DPA");      
                        })


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



