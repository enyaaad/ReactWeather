import React from 'react';
import snowyImage from './../../Assets/snowy.png';
import cloudSunnyImage from './../../Assets/cloudy-day.png';
import cloudImage from './../../Assets/cloud.png';

const WeatherIcon = (weatherInfo:string) => {
    let ImageName = '' ;
    let img = cloudImage;
    switch(weatherInfo) {
        case 'Light snow shower':
            img = snowyImage;
            break;
        case 'Sunny':
            img = cloudSunnyImage;
            break;
    }
    return(
        <div className={ImageName}>
            <img src={img} alt="" height={128} width={128}/>
        </div>
    );
};

export default WeatherIcon;