import { useEffect,useState } from 'react';
import './App.css';
import WeatherBox from './component/WeatherBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherButton from './component/WeatherButton';

import ClipLoader from "react-spinners/ClipLoader"; // <- 가져와
// 1.앱이 실행되자마자 현재 위치기반 날씨가 보인다 / 앱실행?움직인다 useEffet /
// 2.날씨정보에는 도시,섭씨,화씨 날씨상태
// 3.5개의 버튼이 있다. 현재위치,다른도시,나머지 좋아하는 도시
// 4.도시 버튼을 클릭할때 마다 도시별 날씨가 나온다.
// 5.현재도시버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6.데이터를 들고오는 동안 로딩 스피너가 돈다

function App() {
  const [city,setCity]=useState('');
  const [loading,setLoading] = useState(false);
  const cities = ["paris","new york","tokyo","seoul","london"];  
  const [weather,setWeather] = useState(null); 
  const getCurrentLocation=()=>{ 
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat,lon);
    });
  }
  
  const getWeatherByCurrentLocation = async (lat,lon) =>{
   let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ae5311faf86975b8b67aab9d5fb80b27&units=metric`  
   setLoading(true)
   let response = await fetch(url) 
   let data = await response.json();
   setWeather(data);
   setLoading(false)
  }; 
  const getWeatherByCity = async ()=>{
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ae5311faf86975b8b67aab9d5fb80b27&units=metric`
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json(); 
    setWeather(data);
    setLoading(false)
  }


  useEffect(() => {
    if(city == ""){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
    },[city]);
  

  return (
    <div> 
      {/* 로딩중일때 스피터가 나오거나 박스가 나오거나 삼항연산 */}
      {loading ? ( 
         <div className='container' >
        <ClipLoader color= "#f88c6b"loading={loading}size={150}/> 
          </div> 
          ):(
         <div className='container' >
         <ClipLoader color= "#f88c6b"loading={loading}size={150}/>
           <WeatherBox weather={weather}/> 
           <WeatherButton cities={cities} setCity={setCity}/> 
         </div>  
        )}

      <div className='container' >
      <ClipLoader color= "#f88c6b"loading={loading}size={150}/>
        <WeatherBox weather={weather}/> 
        <WeatherButton cities={cities} setCity={setCity}/> 
      </div>  
        {/* app이 가지고 WeatherButton으로 보내기만 한다  */}
    </div>
  );
}

export default App;
