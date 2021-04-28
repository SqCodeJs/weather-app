import React, { Component } from 'react';
import CurrentForecast from './CurrentForecast'
import CurrentForecastInfo from './CurrentForecastInfo'
import './App.css'


class App extends Component {
  state = {
   city:'',
  weather:null,
  forecast:null,
  
    }
handleGetCity=(event)=>{
  event.preventDefault();
  const currentAPI =`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=afed69df412b0f195b8e5623033bda82&units=metric&lang=pl`;
  const forecastAPI =`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=afed69df412b0f195b8e5623033bda82&units=metric&lang=pl`;
  fetch(currentAPI)
  .then(response=>{
    if(response.ok){
      // console.log(response)
      return response;
    }
    throw Error(":(")
   
  })
  .then(response=>response.json())
  
  .then(data=>{
      const weather = data;
      this.setState({
        weather,
        city:''
      })
    })
.catch(err=>{
  
  this.setState({
    city: "",

  })
})
  fetch(forecastAPI)
  .then(response=>{
    if(response.ok){
      
      return response;
    }
    throw Error(":(")
   
  })
  .then(response=>response.json())
  .then(data=>{
    const forecast= data.list;
    this.setState({
      forecast
    })
  })
  .catch(err=>{
  
    this.setState({
      city: "",
     
    })
  })
  
}
handleChange=(e)=>{
  this.setState({
    city: e.target.value
  })

}

  render() { 
   

    return ( <div className="wrapp">  
    <form onSubmit={this.handleGetCity}>
    <label>
    <input type="text" value={this.state.city} onChange={this.handleChange} placeholder="Miasto" />
    </label>
    <input type="submit" value="Pokaż" />
    </form>
    {this.state.weather ? 
    <CurrentForecast 
    weather={this.state.weather}
    forecast={this.state.forecast} /> : ""}
    {this.state.weather ? 
    <CurrentForecastInfo
     weather={this.state.weather} />: ""}
    </div> );
  }
}
 
export default App;




