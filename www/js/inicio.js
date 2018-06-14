// Dom7
var markerArray = [];
var map;
var lati = "";
var lang = "";
var ds;
var dd;

navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });

function onSuccess(position) {
  lati=position.coords.latitude;
  lang=position.coords.longitude;
}
function onError(error) {
      //alert('code: ' + error.code + '\n' +
      //'message: ' + error.message + '\n');
      app.dialog.alert("POR FAVOR ENCIENDA EL GPS");
    }

function initMap() {

        

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        ds=directionsService;
        dd=directionsDisplay;
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: parseInt(lati), lng: parseInt(lang)}
        });
        directionsDisplay.setMap(map);
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: {lat:0.351776,lng:-78.118671},
          destination: {lat:0.346124,lng:-78.119079},
          travelMode: 'WALKING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

function SalirSesion(){ 
  var nombre= localStorage.getItem("NOMBRES");
  app.dialog.alert('Ciao '+nombre);
  localStorage.clear();
  location.reload();
} 

// Login Screen Demo href="menu.html"
function inicioSesion() {


  var username = document.getElementById("login").value;
  var password = document.getElementById("login-psw").value;
  archivoValidacion =  "http://192.168.137.1/WS_MDA/e_sismert/mda_select_usuario.php?jsoncallback=?"
  
         $.getJSON( archivoValidacion,{ 
          correo:username,
          pass:password
        }).done(function(respuestaServer){ 
          console.log(respuestaServer);
            if(respuestaServer.validacion == "ok"){
              location.href = "menu.html";
             //alert('Bienvenido: '+user[0]);
            }
            else{   
              alert('Usuario y/o Contraseña Incorrectos!!');
            }
          }).fail(function() {
            alert('No se puede conectar con el Servidor!!');
          })
}

function verEnMapa(coorx, coory){
  ds.route({
          origin: {lat:0.351776,lng:-78.118671},
          destination: {lat: Number(coorx),lng: Number(coory)},
          travelMode: 'WALKING'
        }, function(response, status) {
          if (status === 'OK') {
            dd.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
}
function solicitudes() {
  archivoValidacion =  "http://192.168.137.1/WS_MDA/e_sismert/mda_select_solicitud.php?jsoncallback=?"
  
         $.getJSON( archivoValidacion,{ 
          id:"1"
        }).done(function(respuestaServer){ 
            if(respuestaServer.validacion == "ok"){
              datos = respuestaServer.datosU;              
              for(var i = 0; i<=datos.length;i++){
                document.getElementById("solicitudes").innerHTML += "<p onclick=verEnMapa('"+datos[i][1]+"','"+datos[i][2]+"')>"+datos[i][0]+"</p>"; 
              }
              
             //alert('Bienvenido: '+user[0]);
            }
            else{   
              alert('Algo Sucedio!!');
            }
          }).fail(function() {
            alert('No se puede conectar con el Servidor!!');
          })
}


  
  
