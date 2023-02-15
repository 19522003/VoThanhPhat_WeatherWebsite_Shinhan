const switchLight = document.querySelector(".light_btn");
const search = document.querySelector(".search");

async function getAPI(input) {
  let apiURL = `http://api.weatherapi.com/v1/forecast.json?key=f0d6d2ec5d83417cab031620230802&q=${input}&days=10&aqi=yes&alerts=no`;

  const res = await fetch(apiURL);
  const data = await res.json();

  renderUI(data);
}

function renderUI(data) {
  const city = document.querySelector(".location");
  const localtime = document.querySelector(".localtime");
  const lastUpdate = document.querySelector(".updatetime");
  const wind = document.querySelector(".wind");
  const uv = document.querySelector(".uv");
  const pressure = document.querySelector(".pressure");
  const cloud = document.querySelector(".cloud");

  const temp_img = document.querySelectorAll(".temp_img img");

  const temperature = document.querySelectorAll(".temperature");
  const temp_desc = document.querySelectorAll(".temp_desc");

  const weather_cart_img = document.querySelectorAll(".weather_cart--img img");
  const conditions = document.querySelectorAll(".condition");
  const conditionsHour = document.querySelectorAll(".condition_hour");
  const temp_detail = document.querySelectorAll(".temp_detail");
  const wind_hour = document.querySelectorAll(".wind_hour");
  const cloud_hour = document.querySelectorAll(".cloud_hour");
  const sunrise_time = document.querySelector(".sunrise_time");
  const sunset_time = document.querySelector(".sunset_time");
  const maxTemp = document.querySelector(".maxTemp");
  const minTemp = document.querySelector(".minTemp");
  const maxWind = document.querySelector(".maxWind");
  const snow = document.querySelector(".snow");

  const temp_F = document.querySelector(".temp_f");
  const temp_f_icon = document.querySelectorAll(".temp_f_icon img");
  const temper = document.querySelectorAll(".temper");
  const temp_hour = document.querySelectorAll(".temp_hour");
  const temp_desc_small = document.querySelectorAll(".temp_desc_small");

  const day_img = document.querySelectorAll(".day_img img");
  const date_detail = document.querySelectorAll(".date_detail");
  const date_temp = document.querySelectorAll(".date_temp");

  let newArrayWeather = data.forecast.forecastday[0].hour.slice(0, 24);
  let smallWeatherArray = newArrayWeather.slice(0, 5);
  let dateOfWeek = data.forecast.forecastday.slice(0, 5);

  city.innerText = data.location.name;
  localtime.innerText = "Today: " + data.location.localtime;
  lastUpdate.innerText = "Update As Of " + data.current.last_updated;
  wind.innerText = data.current.wind_kph + " km/h";
  uv.innerText = data.current.uv;
  pressure.innerText = data.current.pressure_mb + "mb";
  cloud.innerText = data.current.cloud;

  temp_img.forEach((item) =>
    item.setAttribute("src", data.current.condition.icon)
  );

  temperature.forEach(
    (item) => (item.innerHTML = data.current.temp_c + `<sup>o</sup>C`)
  );

  temp_desc.forEach((item) => (item.innerText = data.current.condition.text));

  for (let i = 0; i < newArrayWeather.length; i++) {
    conditions[i].innerText = newArrayWeather[i].condition.text;
    weather_cart_img[i].setAttribute("src", newArrayWeather[i].condition.icon);
    conditionsHour[i].innerText = newArrayWeather[i].time;
    temp_detail[i].innerHTML = newArrayWeather[i].temp_c + `<sup>o</sup>C`;
    wind_hour[i].innerText = newArrayWeather[i].wind_kph + " km/h";
    cloud_hour[i].innerText = newArrayWeather[i].cloud;
  }
  sunrise_time.innerText = data.forecast.forecastday[0].astro.sunrise;
  sunset_time.innerText = data.forecast.forecastday[0].astro.sunset;

  maxTemp.innerHTML =
    "Temp Max: " +
    data.forecast.forecastday[0].day.maxtemp_c +
    ` <sup>o</sup>C`;
  minTemp.innerHTML =
    "Temp Min: " +
    data.forecast.forecastday[0].day.mintemp_c +
    ` <sup>o</sup>C`;
  console.log(maxWind);
  maxWind.innerText =
    "Wind Max: " + data.forecast.forecastday[0].day.maxwind_kph + " km/h";
  snow.innerText =
    "Snow chance: " + data.forecast.forecastday[0].day.totalsnow_cm;

  temp_F.innerHTML = data.current.temp_f + ` <sup>o</sup>F`;

  for (let i = 0; i < smallWeatherArray.length; i++) {
    temp_f_icon[i].setAttribute("src", smallWeatherArray[i].condition.icon);
    temper[i].innerHTML = smallWeatherArray[i].temp_c + ` <sup>o</sup>`;
    temp_hour[i].innerText = smallWeatherArray[i].time;
    temp_desc_small[i].innerText = smallWeatherArray[i].condition.text;
  }

  for (let i = 0; i < dateOfWeek.length; i++) {
    day_img[i].setAttribute("src", dateOfWeek[i].day.condition.icon);
    date_detail[i].innerText = dateOfWeek[i].date;
    date_temp[i].innerHTML = dateOfWeek[i].day.avgtemp_c + ` <sup>o</sup> C`;
  }
}

search.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) getAPI(e.target.value);
});

const tabs = document.querySelectorAll(".tab");
const tabContent = document.querySelectorAll(".tab-content");
tabs.forEach((element, index) => {
  element.onclick = function () {
    const tabActive = document.querySelector(".tab.active");
    const contentActive = document.querySelector(".tab-content.active");
    contentActive.classList.remove("active");
    tabActive.classList.remove("active");
    element.classList.add("active");
    tabContent[index].classList.add("active");
  };
});
switchLight.onclick = function () {
  switchLight.classList.toggle("active");
  const body = document.querySelector("#body");
  body.classList.toggle("blackMode");
  tabs[0].classList.toggle("blackMode");
  tabs[1].classList.toggle("blackMode");

  const header_nav = document.querySelectorAll(".header_nav li a");
  header_nav.forEach((item) => item.classList.toggle("whiteText"));
};

getAPI("Ho Chi Minh");
