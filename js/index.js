// Start Global ========>>>>>>>>
const inputSearch = document.getElementById("inputSearch");
const tableData = document.getElementById("tableData");
const btnSearch = document.getElementById("btnSearch");
let searchData = "";
let finalResponse = "";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// events ---->>>>
inputSearch.addEventListener("input", () => {
  searchData = inputSearch.value;
  getCountry(searchData);
});

btnSearch.addEventListener("click", function () {
  searchData = inputSearch.value;
  getCountry(searchData);
});
// functions ---->>>>>
async function getCountry(country) {
  try {
    let response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=19ee02755d0f4ab7ae4231651240412&q=${country}&days=3`
    );

    finalResponse = await response.json();
    console.log(finalResponse);
    displayData();
  } catch (error) {
    console.log(error);
  }
}

/****  */

let getWeekDay = (date) => new Date(date);

function displayData() {
  let forecastDay = finalResponse.forecast.forecastday;
  let curentNameDay = weekDays[getWeekDay(forecastDay[0].date).getDay()];
  let nextNameDay = weekDays[getWeekDay(forecastDay[1].date).getDay()];
  let latestNameDay = weekDays[getWeekDay(forecastDay[2].date).getDay()];
  let curentDayMonth = months[getWeekDay(forecastDay[0].date).getMonth()];
  let curentMonthNum = new Date().getDate();
  let content = "";

  content = `
     <div class="col-md-4">
                    <div class="inner">
                        <div id="today" class="title  d-flex justify-content-between align-items-center">
                            <div class="day">${curentNameDay}</div>
                            <div class="date"> ${curentMonthNum} ${curentDayMonth}</div>
                        </div>
                        <div id="currentDay" class="p-2">
                            <div class="location">${finalResponse.location.name}</div>
                            <div class="degree">
                                <div class="number">${finalResponse.current.temp_c}<sup>o</sup>C</div>
                                <div class="icon">
                                    <img src="${finalResponse.current.condition.icon}" alt="forecast-icon">
                                </div>
                            </div>
                            <div class="mist">${finalResponse.current.condition.text}</div>
                            <div class="mt-2 details">
                                <span>
                                    <img src="./imgs/icon-umberella@2x.png" alt="umbrella-pic">
                                   ${finalResponse.current.cloud}% </span>
                                <span>
                                    <img src="./imgs/icon-wind@2x.png" class="mx-3" alt="wind-photo">
                                  ${finalResponse.current.wind_kph}km/h </span>
                                <span>
                                    <img src="./imgs/icon-compass@2x.png" class="ms-2" alt="compass-photo">
                                    ${finalResponse.current.wind_dir}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="col-md-4 middle-content">
                    <div class="inner">
                        <div id="today" class="title text-center">
                            <div class="day">${nextNameDay}</div>
                        </div>
                        <div class="d-flex flex-column align-items-center gap-3 justify-content-center mt-5">

                            <div class="text-center"> <img src="${finalResponse.forecast.forecastday[1].day.condition.icon}" alt="icon-sun"> </div>
                            <div class="degree text-center">${finalResponse.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
                            <small>${finalResponse.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
                            <div class="mist">${finalResponse.forecast.forecastday[1].day.condition.text}</div>

                        </div>
                    </div>
                </div>

                <div class="col-md-4 ">
                    <div class="inner">
                        <div id="today" class="title text-center">
                            <div class="day">${latestNameDay}</div>
                        </div>
                        <div class="d-flex flex-column align-items-center gap-3 justify-content-center mt-5">

                            <div class="text-center"> <img src="${finalResponse.forecast.forecastday[2].day.condition.icon}" alt="icon-sun"> </div>
                            <div class="degree text-center">${finalResponse.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
                            <small>${finalResponse.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
                            <div class="mist">${finalResponse.forecast.forecastday[2].day.condition.text}</div>

                        </div>
                    </div>
                </div>

  `;

  tableData.innerHTML = content;
}
