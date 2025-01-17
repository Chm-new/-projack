import React from 'react'
// props 안할려고 weather 바로 가져옴
const WeatherBox = ({weather}) => { // 초기값이 null임으로 weather자체를 불러온듯
  return (
    <div className='weather-box'>
      <div>{weather?.name}</div> {/*삼항연산자 응용 */}
      <h2> 섭씨{weather?.main.temp}℃/ 화씨{weather?.main.temp*1.8+32}℉/ </h2> 
      <h2> 체감온도{weather?.main.feels_like}℃/ </h2> 
       <p>습도: {weather?.main.humidity}%</p>
       구름 정보 {weather?.main.clouds} 
        <h3> {weather?.weather[0].description} </h3>

    </div>
  )
}

export default WeatherBox
