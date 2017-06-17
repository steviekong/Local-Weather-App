// Main function to call weather API and return JSON 
function weather(lat,long,city){
  $.ajax({
    url:'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9b669004eac9629db7123c98a012903e/'+lat+','+long,
    method:'GET',
    datatype:'json'
  }).done(function(data){
   $('#city').text(city);
   $('#temp').text(Math.round(data.currently.temperature));
  var d=new Date(); unitsConvert(Math.round((data.currently.temperature+459.67)*5/9),Math.round(data.daily.data[d.getDay()].temperatureMax),Math.round(data.daily.data[d.getDay()].temperatureMin),Math.round(data.currently.windSpeed));
   $('#forcast').text(data.currently.summary);
    
   $('#temp-max').text(Math.round(data.daily.data[d.getDay()].temperatureMax)); 
   $('#temp-min').text(Math.round(data.daily.data[d.getDay()].temperatureMin)); 
   $('#precip').text(data.currently.precipProbability*100); 
   $('#humidity').text(Math.round(data.currently.humidity*100)); 
   $('#wind').text(Math.round(data.currently.windSpeed));
   $('#weather-icon').attr('class',getIconId(data.currently.icon)); 
   $('#heroimage').css('background',"url('"+getBgImg(data.currently.icon)+"'\)\ center center"); 
   
    
  });
}
// API Call to get users Location with IP. Executes at page load.
$.ajax({
  url: 'https://ipapi.co/json/',
  method: "GET",
   dataType: 'json' 
}).done(function (response) {
  weather(response.latitude,response.longitude,response.city);
});
// Click functions for temperature buttons AKA F | C and Others that require unit conversion
function unitsConvert(dataKelvin,dataMax,dataMin,windSpeed){
$('#set-F').click(function(){
  $('#temp').text(Math.round(dataKelvin*(9/5)-459.67));
  $('#temp-max').text(Math.round(dataMax));
   $('#temp-min').text(Math.round(dataMin));
  $('#wind').text(windSpeed);
  $('.wind-units').text('mph');
  $('#unit-deg').text('°F');
  $('#unit-deg1').text('°F');
  $('#unit-deg2').text('°F');
  $('#set-F').css('color','#4285F4');
   $('#set-C').css('color','white');
});
$('#set-C').click(function(){
  $('#temp').text(Math.round(dataKelvin-273.15));
  $('#temp-min').text(Math.round((dataMin-32)*5/9));
  $('#temp-max').text(Math.round((dataMax-32)*5/9));
  $('#wind').text(Math.round(windSpeed*1.609344));
  $('.wind-units').text('km/h');
  $('#unit-deg').text('°C');
  $('#unit-deg1').text('°C');
  $('#unit-deg2').text('°C');
  $('#set-C').css('color','#4285F4');
   $('#set-F').css('color','white');
});
}
//Icon selector
function getIconId(icon){
  var iconValues=["clear-day","clear-night", "rain", "snow", "sleet", "wind", "fog", "cloudy", "partly-cloudy-day","partly-cloudy-night"];
  var icons=["wi-day-sunny","wi-night-clear","wi-rain","wi-snow","wi-sleet","wi-windy","wi-fog","wi-cloudy","wi-day-cloudy","wi-night-alt-cloudy"]
  for(i=0;i<iconValues.length;i++){
    if(iconValues[i]==icon){
      return "wi"+" "+icons[i];
    }
  }
}
//Returns an image link based on type of weather AKA icon value 
function getBgImg(icon){
  var iconValues=["clear-day","clear-night", "rain", "snow", "sleet", "wind", "fog", "cloudy", "partly-cloudy-day","partly-cloudy-night"];
  var imgLinks=["https://i.imgpile.com/n7vidR.jpg","https://i.imgpile.com/n7vsmg.jpg","https://i.imgpile.com/n7vPSr.jpg","https://i.imgpile.com/n7vcgc.jpg","https://i.imgpile.com/n7vlUN.jpg","https://i.imgpile.com/n7vmYW.jpg","https://i.imgpile.com/n7vrkP.jpg","https://i.imgpile.com/n7vVtL.jpg","https://i.imgpile.com/n7v8n1.jpg"];
  for(i=0;i<iconValues.length;i++){
    if(iconValues[i]==icon){
      return imgLinks[i];
    }
  }
  
  
}