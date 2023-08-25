const apiKey = '685d4117d95b48fa8ae122542232508';

const elements = {
  weatherIcon: document.querySelector('.weather-icon'),
  weatherCondition: document.querySelector('.weather-condition'),
  cityName: document.querySelector('.city-name'),
  date: document.querySelector('.date'),
  time: document.querySelector('.time'),
  temperatureC: document.querySelector('.temperature-c'),
  temperatureF: document.querySelector('.temperature-f'),
  feelsLike: document.querySelector('.feels-like'),
  humidity: document.querySelector('.humidity'),
  visibility: document.querySelector('.visibility'),
  windSPeed: document.querySelector('.wind-speed'),
  card: document.querySelector('.card'),
  cardTwo: document.querySelector('.card-two'),
  errorDiv: document.createElement('div'),
};

const cityForm = document.querySelector('#city-form');
const cityInput = document.querySelector('#city-input');
const openBtn = document.querySelector('.open');
const closeBtn = document.querySelector('.close');

function clearError() {
  elements.errorDiv.textContent = '';
  if (elements.card.contains(elements.errorDiv)) {
    elements.card.removeChild(elements.errorDiv);
  }
}

function errorMsg(error) {
  elements.errorDiv.textContent = `There was a problem with the fetch operation: ${error}`;
  elements.errorDiv.style.color = 'red';

  if (!elements.card.contains(elements.errorDiv)) {
    elements.card.appendChild(elements.errorDiv);
  }

  setTimeout(() => {
    clearError();
  }, 3000);
}

async function logWeather(city) {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const weather = await response.json();

    const weatherIconUrl = weather.current.condition.icon;
    elements.weatherIcon.style.backgroundImage = `url('https:${weatherIconUrl}')`;
    elements.weatherCondition.textContent = weather.current.condition.text;
    elements.cityName.textContent = weather.location.name;
    const localDateTime = weather.location.localtime;
    const [datePart, timePart] = localDateTime.split(' ');
    elements.date.textContent = `${datePart}`;
    elements.time.textContent = `Local Time: ${timePart}`;
    elements.temperatureC.textContent = `${weather.current.temp_c} °C`;
    elements.temperatureF.textContent = `${weather.current.temp_f} °F`;

    elements.feelsLike.textContent = `Feels like: ${weather.current.feelslike_c} °C 
    | ${weather.current.feelslike_f} °F`;
    elements.humidity.textContent = `${weather.current.humidity}% Humidity`;
    elements.visibility.textContent = `${weather.current.vis_km} Km | ${weather.current.vis_miles} Miles Visibility`;
    elements.windSPeed.textContent = `${weather.current.wind_kph} Kph | ${weather.current.wind_mph} Mph Wind Speed`;
  } catch (error) {
    errorMsg(error);
  }
}

logWeather('london');

cityForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = cityInput.value;
  logWeather(city);
});

openBtn.addEventListener('click', () => {
  elements.card.classList.toggle('hidden');
  elements.cardTwo.classList.toggle('hidden');
});

closeBtn.addEventListener('click', () => {
  elements.card.classList.toggle('hidden');
  elements.cardTwo.classList.toggle('hidden');
});
