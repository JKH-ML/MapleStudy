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
            weatherInfo.classList.remove("hidden");
            temp.innerText = `${Math.round(data.main.temp)}°C`;
            city.innerText = data.name;
        })
        .catch(error => {
            console.error("날씨 정보를 가져오는데 실패했습니다:", error);
            
        });
}

function onGeoError() {
    
}

function handleWeatherClick() {
    if (weatherInfo.classList.contains("hidden")) {
        // 위치 권한 요청
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        });
    }
}

// 날씨 버튼 클릭 이벤트
weatherButton.addEventListener("click", handleWeatherClick);

// 외부 클릭 시 날씨 정보 숨기기
document.addEventListener("click", (e) => {
    if (!weatherContainer.contains(e.target) && 
        !weatherInfo.classList.contains("hidden")) {
        weatherInfo.classList.add("hidden");
    }
});

// 30분마다 날씨 정보 업데이트
setInterval(() => {
    if (!weatherInfo.classList.contains("hidden")) {
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
    }
}, 1800000);