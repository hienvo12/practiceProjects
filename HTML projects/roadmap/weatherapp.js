$(document).ready(function() {
  $('#submitWeather').click(function() {
    var city = $("#city").val();
    if(city != ''){
      $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=bd067cb7407397640f6f5aab3c9938e3", //do not upload api key w/o encryption
        type: "GET",
        dataType: "jsonp",
        success: function(data) {
          var widget = show(data);
          $("#show").html(widget);
          $("#city").val('');
        }
      });
    }else {
      $(alert("field cannot be empty"));
    }
  });
});

function show(data){
  return "<h3 style='font-size:40px; font-weight: bold;' class='text-center'>Current Weather for " +
    data.name + ", " + data.sys.country + "</h3>" +
      "<h3><strong>Weather</strong>: " + data.weather[0].main + "</h3>" +
      "<h3><strong>Weather Description</strong>: " + data.weather[0].description + "</h3>" +
      "<h3><strong>Temperature</strong>: " + data.main.temp + "&deg;</h3>" +
      "<h3><strong>Min. Temperature</strong>: " + data.main.temp_min + "&deg;</h3>" +
      "<h3><strong>Max. Temperature</strong>: " + data.main.temp_max + "&deg;</h3>" +
      "<h3><strong>Humidity</strong>: " + data.main.humidity + "</h3>" +
      "<h3><strong>Wind Speed</strong>: " + data.wind.speed + "</h3>" +
      "<h3><strong>Wind Direction</strong>: " + data.wind.deg + "&deg;</h3>";
}
