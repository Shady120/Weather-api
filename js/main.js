// today data
var locationToDay = document.getElementById("locationToDay");
var tempMax = document.getElementById("tempMax");
var imgWeather = document.getElementById("imgWeather");
var weatherStates = document.getElementById("weatherStates");
var humidity = document.getElementById("humidity");
var airSpeed = document.getElementById("airSpeed");
var airDirection = document.getElementById("airDirection");
var today = document.getElementById("today")
var dateToday = document.getElementById("date-today");
var findLocation = document.getElementById("findLocation");

//Next Day
var dataNextDay = document.getElementsByClassName("data-next-day");
var imgWeatherNextDay = document.getElementsByClassName ("img-Weather-Next-Day")
var text = document.getElementsByClassName ("text")
var nextDayName = document.getElementsByClassName ("nextDayName")
// Search
var locationUser = document.getElementById("locationUser");
// Fetch APi
async function getApiWeather(city) {
  var weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=93ca3eff6ffd4de1aba185822240110&q=${city}&days=3`
  );
  var weatherData = await weatherResponse.json();
  return weatherData;
}

//data to day
function displayData(data){
  var dayToday = new Date();
  // dayToday.getDate();
  // dayToday.toLocaleDateString("en-us", { weekday: "long" });
  // dayToday.toLocaleDateStringString("en-us", { month: "short" });
  today.innerHTML = dayToday.toLocaleDateString("en-us", { weekday: "long"});
  dateToday.innerHTML = dayToday.getDate() + " " +dayToday.toLocaleDateString("en-us" , {month:"long"})
  locationToDay.innerHTML = data.location.name;
  tempMax.innerHTML = data.current.temp_c + "<sup>o</sup>c";
  imgWeather.setAttribute("src", data.current.condition.icon);
  weatherStates.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  airSpeed.innerHTML = data.current.wind_kph + "  km/h";
  airDirection.innerHTML = data.current.wind_dir;
}


// nextday
function getNextData(data) {
  var forecastData = data.forecast.forecastday;
  for (i =0 ; i<2 ; i++){
    var dayNext = new Date(forecastData[i + 1].date);
  imgWeatherNextDay[i].setAttribute("src" , forecastData[i+1].day.condition.icon);
   dataNextDay[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
   dataNextDay[i].nextElementSibling.innerHTML = forecastData[i + 1].day.mintemp_c;
   text[i].innerHTML = forecastData[i + 1].day.condition.text;
   nextDayName[i].innerHTML = new Date(forecastData[i + 1].date).toLocaleDateString("en-us", { weekday: "long" });;
  }

}

//start app 
async function startApp(city="Cairo") {
  var weatherData = await getApiWeather(city)
   if (!weatherData.error) {
     displayData(weatherData);
     getNextData(weatherData);
   }
  }
  startApp()


locationUser.addEventListener("input" ,function(){
    startApp(locationUser.value)
})

