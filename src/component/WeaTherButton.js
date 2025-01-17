import React from 'react'
import { Button } from 'react-bootstrap';


const WeatherButton = ({cities,setCity}) => {
  
 
  return (
    <div>
        {/* <Button variant='warning'>warning</Button> */}

     
     
     {cities.map((item, index) => (
        <Button 
          variant='success' 
          key={index} 
          onClick={()=>setCity(item)} // 버튼을 클릭하면 시티(아이템)을 선택해줌
                                      // 어떤 시티(아이템)을 선택한지 state로 설정
          >{item}                               
        </Button>
        ))}

    </div> 
  )
}

export default WeatherButton
