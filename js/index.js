// NOTE: There's a known bug with the fcc weather API where it defaults to a city
// in Japan, so the temperature reading can get messed up. 
// TODO: Change to a more consistent API that doesn't exhibit the same behavior.
// openweathermap would be ideal since the fcc API is just a cached version of that,
// and the icon codes would be the same.

var weatherImages = {};
var weather = "test";
var units = "cel";
//initialize temp as celcius
var unitvalue = "&#8457;";

//get latitude and longitude data
var data = $.parseJSON($.ajax({
        url:  'https://api.ipdata.co',
        dataType: "json", 
        async: false
    }).responseText);
    var x = data.latitude;
    var y = data.longitude;
    var city = data.city;
    var state = data.region_code;
    var country = data.country_name;

// TODO: have the background change depending on the weather conditions
var body = document.getElementsByTagName('body')[0];
body.style.background = 'url(https://github.com/tylerkkp/weather-app/assets/01d.jpg)';
//old default file path. retain until done testing changing backgrounds
//'url(https://images.pexels.com/photos/268917/pexels-photo-268917.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)'


// Creates the url address at which to find the icon url
// TODO: find better source for icons... prefer 'flat' style
var iconurl = "https://fcc-weather-api.glitch.me/api/current?lat=" + data.latitude + "&lon=" + data.longitude + "&APPID=789070de18ce2fd0dd53be9f46ab0394"
var icondata = $.parseJSON($.ajax({
        url:  iconurl,
        dataType: "json", 
        async: false
    }).responseText); 
    var ico = icondata.weather[0].icon;
// Adds the url to the source tag of the #icon id
document.getElementById("icon").src = ico;

// Get City Data
$.get("https://api.ipdata.co", function (response) {
    $("#city").html(response['city']+',');
}, "jsonp");
// Get State Data
$.get("https://api.ipdata.co", function (response) {
    $("#state").html(response['region_code']);
}, "jsonp");
// Get Country Data
$.get("https://api.ipdata.co", function (response) {
    $("#country").html(response['country_name']);
}, "jsonp");

// Set values for city/state/country
document.getElementById('city').value = city;
document.getElementById('state').value = state;
document.getElementById('country').value = country;

// Retrieve temperature using the fcc weather API
$.get("https://fcc-weather-api.glitch.me/api/current?lat=" + data.latitude + "&lon=" + data.longitude, function (response) {
    $("#temp").html(response["main"]["temp"]);
}, "jsonp");

//set units to fahrenheit
function toFahr(unitf) {
  units = "fahr";
  $.get("https://fcc-weather-api.glitch.me/api/current?lat=" + data.latitude + "&lon=" + data.longitude, function (response) {
    $("#temp").html(response["main"]["temp"] *9/5+32);
    document.getElementById("tempunits").innerHTML ="&#8457;";
}, "jsonp");
  
}
//set units to celcius
function toCel(unitf) {
  units = "cel";
  $.get("https://fcc-weather-api.glitch.me/api/current?lat=" + data.latitude + "&lon=" + data.longitude, function (response) {
    $("#temp").html(response["main"]["temp"]);
    document.getElementById("tempunits").innerHTML ="&#8451;";
}, "jsonp");
  
}
