import React from 'react'
import './CurrentForecastInfo.css'

const CurrentForecastInfo = (props) => {
    const sunrise =props.weather.sys.sunrise;
    const sunset =props.weather.sys.sunset;
    const timeZone = props.weather.timezone -3600
    const sunriseTime = new Date((sunrise + timeZone) * 1000).toLocaleString('en-GB',{hour: "numeric",minute:"2-digit"})
    const sunSetTime = new Date((sunset + timeZone) * 1000).toLocaleString('en-GB',{hour: "numeric",minute:"2-digit"})
    return (  
        <div className="currentForecastInfo">
           <div className="columns">
               <div className="row">
                   <div><h4>wschód</h4><p>{ sunriseTime}</p></div>
                   <div><h4>zachód</h4> <p>{sunSetTime }</p></div>
                </div>
               <div className="row">
               <div><h4>wilgotność</h4> <p>{props.weather.main.humidity} %</p></div>
               <div><h4>ciśnienie </h4><p>{props.weather.main.pressure} hPa</p></div>
               </div>
               <div className="row">
               <div><h4>odczuwalna</h4><p>{Math.floor(props.weather.main.feels_like)}<span>&#8451;</span> </p></div>
               <div><h4>wiatr</h4><p>{props.weather.wind.speed} m/s</p></div>
               </div>
           </div>
        </div>
    );
}
 
export default CurrentForecastInfo;