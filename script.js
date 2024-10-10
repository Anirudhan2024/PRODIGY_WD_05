const weatherInfo=document.getElementById('weatherInfo');
const getWeatherBtn=document.getElementById('getWeatherBtn');
const locationInput=document.getElementById('locationInput');
const apiKey='YOUR_API_KEY'; // You can Replace with Your Api key Taken From OpenWeatherMap website to check the weather
async function getWeather(location) {
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try{
        const response=await fetch(apiURL);
        const data=await response.json();
        if(data.cod===200) {
            displayWeather(data);
        }
        else{
            weatherInfo.innerHTML=`<p class="error">${data.message}</p>`;
        }
    }
    catch (error){
        weatherInfo.innerHTML=`<p class="error">Error fetching weather data. Please try again.</p>`;
    }
}
function displayWeather(data){
    const { name,weather,main,wind}=data;
    weatherInfo.innerHTML=`
        <p><strong>Location:</strong>${name}</p>
        <p><strong>Condition:</strong>${weather[0].description}</p>
        <p><strong>Temperature:</strong>${main.temp}°C</p>
        <p><strong>Humidity:</strong>${main.humidity}%</p>
        <p><strong>Wind Speed:</strong>${wind.speed}m/s</p>
    `;
}
getWeatherBtn.addEventListener('click',()=>{
    const location=locationInput.value.trim();
    if(location){
      getWeather(location);
    }
    else{
        weatherInfo.innerHTML=`<p class="error">Please enter a location.</p>`;
    }
});
