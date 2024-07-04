async function getWeather(location) {
    const apiKey = 'YOUR_API_KEY'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (response.ok) {
        
        const weatherInfo = document.getElementById('weather-info');
        const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherInfo.innerHTML = `
          <h2>Current Weather in ${data.name}</h2>
          <img class="weather-icon" src="${weatherIcon}" alt="Weather Icon">
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Weather: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
          <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
        `;
      } else {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      const weatherInfo = document.getElementById('weather-info');
      weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }
  
  
  function handleSubmit(event) {
    event.preventDefault();
    const location = document.getElementById('location-input').value;
    if (location.trim() !== '') {
      getWeather(location);
    } else {
      alert('Please enter a location.');
    }
  }
  
  
  document.getElementById('location-form').addEventListener('submit', handleSubmit);
  
  
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = `${latitude},${longitude}`;
    getWeather(location);
  }, error => {
    console.error('Error getting user location:', error);
  });
  
    