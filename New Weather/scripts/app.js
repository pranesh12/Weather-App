const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI =  (data) => {
  const cityDates = data.cityDates;
  const weather = data.weather;
//update the template
  details.innerHTML = ` 
    <h5 class="my-3">${cityDates.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;

    //updteicon
    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src",iconSrc);

    //update ui image
    let timeSrc = null;
    if(weather.IsDayTime){
      timeSrc = "img/day.svg";
    }
    else{
      timeSrc = "img/night.svg";
    }
    time.setAttribute("src",timeSrc);

    if(card.classList.contains("d-none")){
        card.classList.remove("d-none");
    }
};
const updateCity = async (city) => {
  const cityDates = await getCity(city);
  const weather = await getWeather(cityDates.Key);
  return {
    cityDates: cityDates,
    weather: weather,
  };
};
cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

    localStorage.setItem("city", city);
});

//updating the Local Storage
if(localStorage.getItem("city")){
  updateCity(localStorage.getItem("city"))
  .then(data  => updateUI(data))
  .catch(err => console.log(err));
  ;

}