//var flightPlanCoordinates = [];

    function datos(){
        archivoValidacion =  "http://localhost/APP_MDA/WS_MDA/e_sismert/esismert_select_ubicaciones.php?jsoncallback=?"
  
         $.getJSON( archivoValidacion,{ 
          cedula:'1003291034',
          fecha:'2018-06-08'
        }).done(function(respuestaServer){ 
            if(respuestaServer.validacion == "ok"){
              flightPlanCoordinates= respuestaServer.datosU;
              console.log(flightPlanCoordinates);
              cargar(flightPlanCoordinates);
              //addMarker(punt);
              //console.log(triangleCoords);
            }
            else{   
              alert('Usuario y/o Contraseña Incorrectos!!');
            }
          }).fail(function() {
            alert('No se puede conectar con el Servidor!!');
          })
 
      }

      function cargar(flightPlanCoordinates) {

        var markerArray = [];

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        var myLatlng = new google.maps.LatLng('0.351776','-78.118671');
        var mapOptions = {zoom: 18,center: myLatlng};      

        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        

      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      flightPath.setMap(map);
        
      }