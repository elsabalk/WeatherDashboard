var searchBtnEl = document.querySelector("#searchBtn");
var inputTextboxEl = document.querySelector("#form1");
var cityDataDisplayEl = document.querySelector("#cityData");
var cityList = document.querySelector("#city-list");
var currentWeatherResultsEl = document.querySelector("#current-weather");
var fiveDayForecastResultsEl = document.querySelector("#five_day_forecast");

var firstDayBoxEl = document.querySelector("#first_day_date");
var firstDayTempEl = document.querySelector("#first_day_temp");
var firstDayHumidityEl = document.querySelector("#first_day_humidity");



var ol = document.querySelector("ol");


/////////////////////////////////////////////
var currentDate = moment().format("MMMM Do, YYYY");
$("#current-weather").text(currentDate);

var currentDate = moment()
$("#first_day_date").text(currentDate.format('MM-DD-YYYY'));

var secondDayDate = moment().add(1, 'days');
$("#second_day_date").text(secondDayDate.format('MM-DD-YYYY'));

var currentDate = moment().add(2, 'days');
$("#third_day_date").text(currentDate.format('MM-DD-YYYY'));

var currentDate = moment().add(3, 'days');
$("#fourth_day_date").text(currentDate.format('MM-DD-YYYY'));

var currentDate = moment().add(4, 'days');
$("#fifth_day_date").text(currentDate.format('MM-DD-YYYY'));
////////////////////////////////////////////////////



var apiKey = "9e729922e0d89fca17319ba813d9ec9d";

var cityArray = [];
// This function reads all cities entered from the city array
function renderCities() {

    // Sets list to emtpy to start
    cityList.innerHTML = "";

    // building html structure based on array count
    for (var i = 0; i < cityArray.length; i++) {
        var todo = cityArray[i];

        var li = document.createElement("li");
        //li.textContent = todo;
        li.setAttribute("data-index", i);

        var button = document.createElement("button");
        button.textContent = todo;

        li.appendChild(button);
        cityList.appendChild(li);
    }
}

// Set items based on key
function storeCityValues() {
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("cities", JSON.stringify(cityArray));
}


//On page Load
function init() {


    // Get stored city list from localStorage
    var storedTodos = JSON.parse(localStorage.getItem("cities"));

    // If city were retrieved from localStorage, update the city array to it
    if (storedTodos !== null) {
        cityArray = storedTodos;
    }

    // Show cities on the DOM
    renderCities();
}


// Once search icon is clicked trigger main method actions
searchBtnEl.addEventListener("click", function(event) {
    event.preventDefault();

    // Grabbing input text and assigining a variable
    var inputFieldText = inputTextboxEl.value.trim();
    console.log(inputFieldText)

    // Return from function early if submitted city is blank
    if (inputFieldText === "") {
        alert("Please enter a city to search our awesome weather by");
    }

    // Add new city to city array, clear the input
    cityArray.push(inputFieldText);
    inputTextboxEl.value = "";

    console.log(cityArray)

    //Store updated city in localStorage, re-render the list
    storeCityValues();
    renderCities();

      
    var requestUrl=  'https://api.openweathermap.org/data/2.5/forecast?q=' + inputFieldText + '&appid=9e729922e0d89fca17319ba813d9ec9d';

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    
    .then(function (data) {
      //for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        currentWeatherResultsEl.textContent = "City: " +  data.city.name + "\n" + "Temp: " +  data.list[0].main.temp +  "\n" +  "Humidity: " + data.list[0].main.humidity;
        ol.appendChild(listItem);
  

        var forecastOneTemp = data.list[0].main.temp;
        var forecastOneHumidity =  data.list[0].main.humidity
        var listItem = document.createElement('li');
        fiveDayForecastResultsEl.textContent = "Temp: " +  forecastOneTemp +  "\n" +  "Humidity: " + forecastOneHumidity;
        ol.appendChild(listItem);
        //Having issues with divs disappearing on click, but able to retrieve data from API assign it to elements
    });
    
   
});

// Calls init to retrieve data and render it to the page on load
 init()