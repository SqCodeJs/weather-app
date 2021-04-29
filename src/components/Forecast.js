import React from 'react';
import './Forecast.css'



const Forecast = (props) => { 
    const timeZone =  props.weather.timezone;
    const forecast = props.forecast.filter((treeHours,idx) => idx < 5).map((item,i)=>(
    <div className="column" key={i}> 
        <h4>{new Date((item.dt + timeZone)*1000).toLocaleTimeString('en-GB',{hour: "numeric",minute:"2-digit"})}</h4>
            <div className="weather-icon">
             <img style={{width:'40px'}} src= {`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}alt='ok' />
            </div>
        <h4>{Math.floor(item.main.temp)}<span>&#8451;</span></h4>
    </div>)
    );
    
  
 
    return ( 
        <div className="forecast">
        {forecast}
        </div>
     );
}
 
export default Forecast;