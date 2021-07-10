// var ip =  document.getElementById('ipaddress');    var api_key = "at_ONQTCJNH3JIump9YwqOKBseCMpBIH";    $(function () {       $.ajax({           url: "https://geo.ipify.org/api/v1",           data: {apiKey: api_key, ipAddress: ip},           success: function(data) {               $("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");           }       });    });

$(document).ready(function(){
    //making a get request to the api
    
     

    
    $("form").submit(function(event){
        event.preventDefault();

        var ip = $("#input").val();

       

        
        if(ip == " "){
            alert("Enter ip address");
        }

        var api_key = "at_ONQTCJNH3JIump9YwqOKBseCMpBIH"; 
        
        var url = "https://geo.ipify.org/api/v1?apiKey=at_SSqNQP7l0fuO9Tm7bQb1SUL0K0cp6&domain="+ip;
        //var url = "https://geo.ipify.org/api/v1?apiKey=at_ONQTCJNH3JIump9YwqOKBseCMpBIH&ipAddress=8.8.8.8";

        $.get(url, function(data){
            // console.log(data);
            // if(ip = data.as.domain) {
            //     ip = data.as.domain
            // }
            var ipAddress = data.ip;

            var locationCity = data.location.city;

            var locationRegion = data.location.country;

            if(data.location.postalCode = " ") {
                data.location.postalCode = " No postal code";
               }

            var postalCode = data.location.postalCode;

            var timezone = data.location.timezone;

            var isp = data.isp;

            var lat = parseFloat(data.location.lat);

            var lng =parseFloat(data.location.lng);

            //make an object 

            var position = {
                lat:lat,
                lng:lng
            }

            displayDetails(ipAddress, locationCity, locationRegion, postalCode, timezone, isp);

            displayMap(position);
        });
    });

    function displayDetails(ipAddress, locationCity, locationRegion, postalCode, timezone, isp) {

        var newIp = `${ipAddress}`;
        var newLocationCity = `${locationCity}`;
        var newLocationRegion = `${locationRegion}`;
        var newPostalCode = `${postalCode}`;
        var newTimeZone = `${timezone}`;
        var newIsp = `${isp}`;

        $("#ipaddress").html(newIp);
        $("#city").html(newLocationCity + ", " + newLocationRegion + " " + newPostalCode);
        $("#timezone").html("UTC "+ " " + newTimeZone);
        $("#isp").html(newIsp);
    }

    function displayMap(position){

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

        
        var mymap = L.map('map').setView([latitude, longitude], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 30,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(mymap);

        L.marker([latitude, longitude]).addTo(mymap)
        .bindPopup("<b>This is the location</b>").openPopup();
        
        L.circle([latitude, longitude], 500, {
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
    
    
    }


})