import React, {useState} from 'react';
import axios from "axios";
import './WeatherItemStyle.sass';
import '../types/index.d.ts';
import WeatherIcon from "./ui-components/WeatherIcon";

const base_url:string ='https://goweather.herokuapp.com/weather/';
const WeatherItem = () => {
    let [city, setCity] = useState('');
    const [currCity,setCurrCity] = useState('');

    //инитиал value лучше вынести в отдельный объект за пределы еомпонента
    const [weather, setWeather] = useState({temperature:'',wind:'',description:'',forecast:[{day:'',temperature:'',wind:''}]});

    const [isShow,setVisibility] = useState(false);


    async function getWeather(){
        if(city !== ''){
            //base url тоже в идеале куда-то вытащить
            const response = await axios.get(base_url + city)
            setWeather(response.data);
            setVisibility(true);
            setCurrCity(city);
            setCity('');
        }
        else{
            setVisibility(false);
        }
    }

    return (
        <div>
            <div className="startContent">
                {/*в идеале вынести в хэндлер и поднять наверх onChange*/}
                <input value={city} type="text" className="searchInput" onChange={event => setCity(event.target.value)}/>
                <button onClick={getWeather} className="searchButton">
                    Поиск
                </button>
            </div>
            {isShow ?
                <div className="weatherInfo" >
                    <h3>Weather in {currCity}</h3>
                    {WeatherIcon(weather.description)}
                    <h3>Temperature in your city is: {weather.temperature}</h3>
                    <h3>Speed of wind is: {weather.wind}</h3>
                    <h3>{weather.description}</h3>
                    <h3>Forecast on next three days</h3>
                    <div className="forecast">
                        {weather.forecast.map((el) =>{
                            return(
                                <div className={'forecastDay'}>
                                    <h5>Day: {el.day}</h5>
                                    <h5>Temperature: {el.temperature}</h5>
                                    <h5>Speed of wind: {el.wind}</h5>
                                </div>
                            )
                        })}
                    </div>
                </div>
                : null}
        </div>
    );
};

export default WeatherItem;
