var lat = "";
    var lang = "";
    var punt;
    var map;
    var infowindow;
    var markers = [];

    var triangleCoords = [
          {lat: 0.343843, lng: -78.119549},
          {lat: 0.343880, lng: -78.120118},          
          {lat: 0.342469, lng: -78.120341},
          {lat: 0.342386, lng: -78.119779}
        ];


    function cargar(){
        archivoValidacion =  "http://192.168.4.8/sismert/e_sismert/esismert_select_coor.php?jsoncallback=?"
  
         $.getJSON( archivoValidacion,{ 
          opcion:'prueba'
        }).done(function(respuestaServer){ 
            if(respuestaServer.validacion == "ok"){
              punt= respuestaServer.datosU;
              addMarker(punt);
            }
            else{   
              alert('Usuario y/o Contraseña Incorrectos!!');
            }
          }).fail(function() {
            alert('No se puede conectar con el Servidor!!');
          })
 
      }

    /*MI UBICACACION*/
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });
      
      function onSuccess(position) {
        lat=position.coords.latitude;
        lang=position.coords.longitude;

        infowindow = new google.maps.InfoWindow();

        var myLatlng = new google.maps.LatLng(lat,lang);
        var mapOptions = {zoom: 15,center: myLatlng};      

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      }

      function onError(error) {
        alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
      }
      /*MI UBICACACION*/


      // Adds a marker to the map and push to the array.
      function addMarker(location) {
        deleteMarkers();
        var marker, i;
          for (i = 0; i < location.length; i++) {  
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(location[i][1], location[i][2]),
              map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(location[i][0]);
                infowindow.open(map, marker);
              }
            })(marker, i));
            markers.push(marker);
          }

        // Construct the polygon.
        var bermudaTriangle = new google.maps.Polygon({
          paths: triangleCoords,
          strokeColor: '#FF0000',
          strokeOpacity: 0.1,
          strokeWeight: 1,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
        bermudaTriangle.setMap(map);
        markers.push(bermudaTriangle);

      }

      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }