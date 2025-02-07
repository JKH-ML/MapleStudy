const weatherButton = document.querySelector("#weather-button");
const weatherInfo = document.querySelector("#weather-info");
const temp = document.querySelector("#temp");
const city = document.querySelector("#city");
const API_KEY = "1940efdbd399dd50c770bba7984660bd"; // OpenWeather API 키

function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            temp.innerText = `온도: ${Math.round(data.main.temp)}°C`;
            city.innerText = `위치: ${data.name}`;
        })
        .then(()=> weatherButton.classList.add("hidden"))
        .catch(error => {
            console.error("날씨 정보를 가져오는데 실패했습니다:", error);
        });
}

function onGeoError() {
}

function handleWeatherClick() {
  navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
  });
}

// 날씨 버튼 클릭 이벤트
weatherButton.addEventListener("click", handleWeatherClick);