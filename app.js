

 var url = "https://geo.ipify.org/api/v1?apiKey=at_SSqNQP7l0fuO9Tm7bQb1SUL0K0cp6&ipAddress";

 $.get(url, function(data){
	//   console.log(data);

	//   if(data.proxy.vpn = true) {
	// 	  alert("Disable your vpn");
	// 	  $('<div>in process...</div>')
	// 	.addClass('overlay')
	// 	.fadeTo(0, 0.4)
	// 	.appendTo('body');
	//   }

	//   if(data.proxy.tor = true) {
	// 	alert("We don't support tor browsers");
	// 	$('<div>in process...</div>')
	// 	.addClass('overlay')
	// 	.fadeTo(0, 0.4)
	// 	.appendTo('body');
	// }


	  
	   $("#ipaddress").html(data.ip);

	   if(data.location.postalCode = " ") {
		data.location.postalCode = "No postal code";
	   }

	  $("#city").html(data.location.city + ", " + data.location.country + " " + data.location.postalCode);

	   $("#timezone").html("UTC "+ " " +data.location.timezone);

	  $("#isp").html(data.isp);

	  var lat = parseFloat(data.location.lat);

	  var lng =parseFloat(data.location.lng);

	  //make an object 

	  var position = {
		  lat:lat,
		  lng:lng
	  }

	  var map = document.getElementById('map');
       
	  if(map != undefined || map != null){
		  map.remove();
		 $("#map").html("");
		 $("#preMap").empty();
		 $( "<div id=\"map\" style=\"height: 70vh; width: 100%;\"></div>" ).appendTo("#premap");
	  }

	  var latitude = `${position.lat}`;

	  var longitude = `${position.lng}`;
	  console.log(latitude, longitude);

	  
	  var mymap = L.map('map').setView([latitude, longitude], 16);
	  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		  maxZoom: 30,
		  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		  id: 'mapbox/streets-v11',
		  tileSize: 512,
		  zoomOffset: -1
	  }).addTo(mymap);

	  L.marker([latitude, longitude]).addTo(mymap)
	  .bindPopup("<b>This is your location</b>").openPopup();
	  
	  L.circle([latitude, longitude], 10, {
	  color: 'red',
	  fillColor: '#f03',
	  fillOpacity: 0.5
	  }).addTo(mymap).bindPopup("It's located in this vicinity");
	  
	  var popup = L.popup();

  function onMapClick(e) {
	  popup
		  .setLatLng(e.latlng)
		  .setContent("You clicked the map at " + e.latlng.toString())
		  .openOn(mymap);
  }

  mymap.on('click', onMapClick);
 })



