 function initialize() {
        var mapOptions = {
          zoom: 16,
          center: new google.maps.LatLng(45.711802, -121.522657)
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
            
      var infowindow = new google.maps.InfoWindow();

  var marker = new google.maps.Marker({
    map: map,
    // Define the place with a location, and a query string.
    place: {
      location: {lat: 45.711802, lng: -121.522657},
      query: 'Big Gym, Oregon'

    },
    // Attributions help users find your site again.
    attribution: {
      source: 'Google Maps JavaScript API',
      webUrl: 'https://developers.google.com/maps/'
    }
  });

  // Construct a new InfoWindow.
  var infowindow = new google.maps.InfoWindow({
    content: 'Big Gym'
  });

  // Opens the InfoWindow when marker is clicked.
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  
  
      }



 function loadScript() {
        if (window.google){  
            initialize(); 
            console.log("dfdf");
            return;
        }
            console.log("dfdf1111111");
     var script = document.createElement('script');
        script.setAttribute('id', 'scriptmappa');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' + '&signed_in=true&callback=initialize';
        document.body.appendChild(script);
    }