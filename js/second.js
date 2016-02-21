

// Detects if user is on mobile and makes width 100%
function detectBrowser() {
  var useragent = navigator.userAgent;
  var map = document.getElementById("map");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    map.style.width = '100%';
    map.style.height = '100%';
  } else {
    map.style.width = '600px';
    map.style.height = '800px';
  }
}

/*Geolocation - not working*/

  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}

//Sets default location of map upon page load to Boston

var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
  // alert("initialize working");
  directionsDisplay = new google.maps.DirectionsRenderer();
  var boston = new google.maps.LatLng(42.3601, -71.0589);
  var myOptions = {
    zoom:10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: boston
    }
  map = new google.maps.Map(document.getElementById("map"), myOptions);
  directionsDisplay.setMap(map);
}

//Calculate driving distance

function calcRoute() {
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  // var distance = document.getElementById("distance").innerHTML;
      
  var request = {
    origin:start, 
    destination:end,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      distance = response.routes[0].legs[0].distance.value / 1609.34;
      distance = distance.toFixed(0) + " miles";
      console.log(response.routes);
      //this is the amount of tme it will take to drive to destination
      console.log(response.routes[0].legs[0].duration.text);
      time = response.routes[0].legs[0].duration.text;
      //these are the driving instructions
      //how can i get all 47 instructions displayed?
      console.log(response.routes[0].legs[0].steps[0].instructions);
      console.log(response.routes[0].legs[0].steps[1].instructions);
    }

  document.getElementById("tripResult").innerHTML = "<p><strong>"+start+"</strong>" + " is " + "<strong class=\"highlight\">"+distance+"</strong>" + " away from " + "<strong>"+end+"</strong>" + "." + "<p>It would take " + "<strong class=\"highlight\">"+time+"</strong>" + " of driving to get there.</p>";
  
  });

}

$(document).ready(function() {

  initialize();

  $("#go").click(calcRoute);

  /*

$("#about").on("click",function(){
  $("#dialog-message").dialog({
    modal: true,
    buttons: {
      Ok: function() {
        $( this ).dialog( "close" );
      }
    }
  });
});

*/

window.onload = function() {
  document.getElementById("about").onclick = function(){
        var overlay = document.getElementById("overlay");
        var popup = document.getElementById("popup");
        overlay.style.display = "block";
        popup.style.display = "block";
    };
  
  document.getElementById("x").onclick = function(){
        var overlay = document.getElementById("overlay");
        var popup = document.getElementById("popup");
        overlay.style.display = "none";
        popup.style.display = "none";      
  }

  document.getElementById("close").onclick = function(){
        var overlay = document.getElementById("overlay");
        var popup = document.getElementById("popup");
        overlay.style.display = "none";
        popup.style.display = "none";      
  }


};



});




