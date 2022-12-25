import React, {useState} from 'react';
import axios from "axios";
import './WeatherItemStyle.sass';
import '../types/index.d.ts';
import snowyImage from './../Assets/snowy.png';
import cloudSunnyImage from './../Assets/cloudy-day.png';
import cloudImage from './../Assets/cloud.png';
const WeatherItem = () => {
    const [city, setCity] = useState('');
    const [currCity,setCurrCity] = useState('');
    const [weather, setWeather] = useState({temperature:'',wind:'',description:'',forecast:[{day:'',temperature:'',wind:''}]});
    const [isShow,setState] = useState(false);


    async function getWeather(){
        if(city !== ''){
            const response = await axios.get('https://goweather.herokuapp.com/weather/'+city)
            setWeather(response.data);
            setState(true);
            setCurrCity(city);
            setCity('');
        }
        else{
            setState(false)
        }
    }
    function toggleWeatherImage(weatherInfo:string){
        let ImageName = '' ;
        if(weatherInfo === 'Light snow shower')
            return (
                <div className={ImageName}>
                    <img src={snowyImage} alt="" height={128} width={128}/>
                </div>
            )
        if(weatherInfo === 'Sunny')
            return (
                <div className={ImageName}>
                <img src={cloudSunnyImage} alt="" height={128} width={128}/>
                </div>
            )
        return(
            <div className={ImageName}>
                <img src={cloudImage} alt="" height={128} width={128}/>
            </div>
        )
    }
    const weatherInf = () => (
        <div className="weatherInfo" >
        <h3>Weather in {currCity}</h3>
        {toggleWeatherImage(weather.description)}
        <h3>Temperature in your city is: {weather.temperature}</h3>
        <h3>Speed of wind is: {weather.wind}</h3>
        <h3>{weather.description}</h3>
        <h3>Forecast on next three days</h3>
        <div className="forecast">
            {weather.forecast.map((el,key) =>{
                return(
                    <div key={key} className={'forecastDay'}>
                        <h5>Day: {el.day}</h5>
                        <h5>Temperature: {el.temperature}</h5>
                        <h5>Speed of wind: {el.wind}</h5>
                    </div>
                )
            })}
        </div>
    </div>)

    return (
        <div>
            <div className="startContent">
                <input value={city} type="text" className="searchInput" onChange={event => setCity(event.target.value)}/>
                <button onClick={getWeather} className="searchButton">
                    Поиск
                </button>
            </div>
            {isShow ? weatherInf() : null}
        </div>
    );
};

export default WeatherItem;