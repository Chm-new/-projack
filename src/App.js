import { useEffect, useState } from 'react';
import './App.css';
import WeatherBox from './component/WeaTherBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherButton from './component/WeaTherButton';

function App() {
  const [city, setCity] = useState('');
  const cities = ["paris", "new york", "tokyo", "seoul", "london"];
  const [weather, setWeather] = useState(null);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
      console.log("현재 위치 :", lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ae5311faf86975b8b67aab9d5fb80b27&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ae5311faf86975b8b67aab9d5fb80b27&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  }

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      <div className='container'>
        
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} setCity={setCity} />
      </div>
    </div>
  );
}

export default App;
