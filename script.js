var searchBtnEl = document.querySelector("#searchBtn");
var inputTextboxEl = document.querySelector("#form1");
var cityDataDisplayEl = document.querySelector("#cityData");
var cityList = document.querySelector("#city-list");

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

    // Return from function early if submitted todoText is blank
    if (inputFieldText === "") {
        alert("Please enter a city to search our awesome weather by");
    }

    // Add new todoText to todos array, clear the input
    cityArray.push(inputFieldText);
    inputTextboxEl.value = "";

    console.log(cityArray)

    //Store updated todos in localStorage, re-render the list
    storeCityValues();
    renderCities();
});

// Calls init to retrieve data and render it to the page on load
init()