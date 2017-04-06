var weather = new XMLHttpRequest();
	weather.open("GET", "http://api.wunderground.com/api/a31acf456e6ac67d/conditions/q/NY/New_York.json", false);
	weather.send(null);

	var r = JSON.parse(weather.response);
	var weather = "Current location: " + r.current_observation.display_location.full + "<br />" 
	var temp = r.current_observation.temperature_string + "<br />";
	var wind = r.current_observation.wind_string + "<br />";
	var icon = r.current_observation.icon_string + "<br />";
	var observation_time = r.current_observation.observation_time + "<br />";

	document.getElementById("weather").innerHTML = weather;
	document.getElementById("temp").innerHTML = temp;
	document.getElementById("wind").innerHTML = wind;
	document.getElementById("icon").innerHTML = icon;
	document.getElementById("observation_time").innerHTML = observation_time;



var app = app || {};

app.main = (function(){

	console.log('Loading');

	
	var attachEvents = function(){

		console.log('Test events');

		
		$('#search-button').off('click').on('click', function(){
			loadData($('#search-box').val());
			console.log("what the hell is this:" +$('#search-box').val());
		});

		$('#search-box').keypress(function(e) {
			if (e.keyCode == 13) { //when you press enter
				loadData($('#search-box').val()); //its going to do something. function. takes the text of whats inside the imput (search box) and gives back that value
			}
		});
	};

	// loading some data from the API
	var loadData = function(query){
		console.log('Searching for ' + query + '...');

		var giphyUrl="http://api.giphy.com/v1/gifs/search?q="+query+"&api_key=dc6zaTOxFJmzC";
		
	    $.ajax({
	        url: giphyUrl,
	        data: {
	            q: query,
	        
	            limit: 25, //how many will show
	            offset: 0, 
	        },
	        success: function (response) {
				console.log("response is:"+response.data);

				appendData(response.data);
	        }
	    });

	};

	// Display the data
	var appendData = function(data){
		console.log('appending data.');
		console.log(data);

		 // To search for something again
		// clear it first
		$('#view').empty();

		
		// $('html, body').animate({
  //  scrollTop: $('#view').offset().top + 'px'
  // }, 'slow');

		for(var i = 0; i < data.length; i++){ //limit is 100 give you 100 data- 100 gifs
			$('#view').append('<img src="' + data[i].images.downsized.url + '" class="gallery-item"/>');
		}
	};

	var init = function(){
		console.log('init testing');
		attachEvents();
	};

	return {
		init: init
	};
})();

/* Waits for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);