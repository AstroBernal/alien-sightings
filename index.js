// Get references to the tbody elements: Input Fields and search/clear buttons
// Input Fields:
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $stateInput = document.querySelector("#state");
var $cityInput = document.querySelector("#city");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
// Search, Clear & LoadMore buttons:
var $searchBtn = document.querySelector("#search");
var $loadMoreBtn = document.querySelector("#load-btn");
var $clearBtn = document.querySelector("#clear");

// Add an event listener to both the searchButton & clearButton
$searchBtn.addEventListener("click", handleSearchButtonClick);
$clearBtn.addEventListener("click", handleClearButtonClick);

// When the users presses either "Enter" or "Tab", keys 13 & 9, respectively
// invoke the Search button
addEventListener("keyup", function(event) {
  // Cancel the default action if needed
  event.preventDefault();
  // Numbere 13 equates to pressing "Enter" on the keayboard
  if (event.keyCode === 13 || event.keyCode === 9) {
    console.log("enter or tab key pressed " + $stateInput.value + " " + $cityInput.value + " " + $shapeInput.value)
    handleSearchButtonClick();
  }
});

// Set filteredSightings to sightingsData initially
var filteredDates = dataSet;
// Set Starting Sighting and Results per page
var startingIndex = 0;
var resultsPerPage = 25;


function renderTableSection() {
    $tbody.innerHTML = "";
    var endingIndex = startingIndex + resultsPerPage;
    var datesSubset = filteredDates.slice(startingIndex, endingIndex);
    for (var i = 0; i < datesSubset.length; i++) {
      // Get get the current ufo object and its fields
      var ufo = datesSubset[i];
      var fields = Object.keys(ufo);
      // Create a new row in the tbody, set the index to be i + startingIndex
      var $row = $tbody.insertRow(i);
      for (var j = 0; j < fields.length; j++) {
        // For every field in the ufo object, create a new cell at set its inner text to be the current value at the current ufo's field
        var field = fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = ufo[field];
      }
    }
  }


  function handleSearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace
    var filterDate = $dateInput.value.trim();
    var filterState = $stateInput.value.trim();
    var filterCity = $cityInput.value.trim();
    var filterCountry = $countryInput.value.trim();
    var filterShape = $shapeInput.value.trim();
    // Set filteredDates to an array of all addresses whose "datetime" matches the filter
    filteredDates = dataSet.filter(function(ufo) {
        var ufoDate = ufo.datetime.substring(0, filterDate.length);
        var ufoCity = ufo.city.substring(0,filterCity.length).toLowerCase();
        var ufoState = ufo.state.substring(0, filterState.length).toLowerCase();
        var ufoCountry = ufo.country.substring(0, filterCountry.length).toLowerCase();
        var ufoShape = ufo.shape.substring(0, filterShape.length).toLowerCase();
        if (ufoDate === filterDate && ufoCity === filterCity && ufoState === filterState && ufoCountry === filterCountry && ufoShape === filterShape){
          return true;
        }
        return false;
    });
    renderTableSection();
  }
  // Render the table for the first time on page load
  renderTableSection();

  function handleClearButtonClick() {
    //   Set all search fields back to blank
    // $dateInput.value = "";
    // $cityInput.value = "";
    // $stateInput.value = "";
    // $countryInput.value = "";
    // $shapeInput.value = "";
    // filteredDates = dataset;
    // var startingIndex = 0;
    // var resultsPerPage = 25;
    // renderTableSection();
    location.reload();
  }

  // Add an event listener to the button, call handleButtonClick when clicked
  $loadMoreBtn.addEventListener("click", handleButtonClick);
  
  function handleButtonClick() {
    // Increase startingIndex by 100 and render the next section of the table
    startingIndex += resultsPerPage;
    renderTableSection();  
    // Check to see if there are any more results to render
    if (startingIndex + resultsPerPage >= filteredDates.length){
      $loadMoreBtn.classList.add("disabled");
      $loadMoreBtn.innerText = "All Data Loaded";
      $loadMoreBtn.removeEventListener("click", handleButtonClick);
    
    }
    renderTableSection();
  }