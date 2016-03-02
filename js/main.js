/*

flight api
when select "driving" pull from budget api and get rent a car and show cars they can get
show where they can purchase flight
https://www.mapbox.com/
use mapbox for fight data and shuttle api for nba


*/


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
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}
var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
// show google map in iframe
function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService;
  var infoWindow = new google.maps.InfoWindow({map: map});
  //Sets default location of map upon page load to Boston
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 42.3601, lng: -71.0589},
    zoom:10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  directionsDisplay.setMap(map);
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent("Location found.");
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}

//Calculate driving distance
function calcRoute() {
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var selectedMode = document.getElementById("mode").value;
  var request = {
    origin:start, 
    destination:end,
    travelMode: google.maps.DirectionsTravelMode[selectedMode],
    avoidTolls: true
  };
  // Route the directions and pass the response to a function
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      distance = response.routes[0].legs[0].distance.value / 1609.34;
      distance = distance.toFixed(0) + " miles";     
      //print out array of information
      console.log(response.routes);
      // Amount of tme it will take to drive to destination
      time = response.routes[0].legs[0].duration.text;
    }
  $("#tripResult").html("<p><strong>"+start+"</strong>" + " is " + "<strong class=\"highlight\">"+distance+"</strong>" + " away from " + "<strong>"+end+"</strong>" + "." + "<p>It would take " + "<strong class=\"highlight\">"+time+"</strong>" + " of " + "<span class=\"mode\">" + selectedMode + "</span>" + " to get there.</p>");
  // spit out directions in left panel
  directionsDisplay.setPanel(document.getElementById("directions"));
  });
}

$(document).ready(function() {
  initialize();
  //event listener to calculate route
  $("#go").click(calcRoute);
  // when click on "about" creates popup
  $("#about").on("click",function(){
    $("#overlay").css("display","block");
    $("#popup").css("display","block");
  });
  // when click on "x" in about window, closes window
  $("#x-about").on("click", function(){
    $("#overlay").css("display","none");
    $("#popup").css("display","none");      
  });
  // when click on "your trips" or "invite a friend" creates popup
  $(".nope").on("click",function(){
    $("#overlay").css("display","block");
    $("#sorry").css("display","block");
  });
  // when click on "x" in sorry window, closes window
  $("#x-sorry").on("click", function(){
    $("#overlay").css("display","none");
    $("#sorry").css("display","none");      
  });

});

