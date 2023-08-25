const apiKey = '685d4117d95b48fa8ae122542232508';

const weatherIcon = document.querySelector('.weather-icon');
const weatherCondition = document.querySelector('.weather-condition');
const cityName = document.querySelector('.city-name');
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const temperatureC = document.querySelector('.temperature-c');
const temperatureF = document.querySelector('.temperature-f');

async function logWeather() {
  try {
    const city = cityName.textContent;
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const weather = await response.json();
    console.log(weather);

    let weatherIconUrl = weather.current.condition.icon;
    weatherIcon.style.backgroundImage = `url('https:${weatherIconUrl}')`;
    weatherCondition.textContent = weather.current.condition.text;
    cityName.textContent = weather.location.name;
    date.textContent = weather.current.condition.last_updated;
    time.textContent = weather.location.localtime;
    temperatureC.textContent = `${weather.current.temp_c} C`;
    temperatureF.textContent = `${weather.current.temp_f} F`;
    // checkIcon();
  } catch (error) {
    console.log('There was a problem with the fetch operation:', error);
  }
}

logWeather();