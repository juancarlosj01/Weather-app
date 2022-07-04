import React from 'react';
import useHook from '../hooks/useHook.jsx'
import { useState } from 'react';
import { useEffect } from 'react';

const Weather = () => {
    
    const { city, country, temperature, windSpeed, clouds, pressure, weatherDescription, icon } = useHook()

    const [temp, setTemp] = useState([0, " °C"]);
    const [iconUrl, setIcon] = useState('');
    const [background, setBackground] = useState('');
 
    useEffect(() => {
        setTemp([(Math.round(temperature * 100) / 100), " °C"]);
        changeBackground(icon)
    },[temperature, icon]);

    const handleTemperature = () => {
        let value = 0;
        if(temp[1] === " °C"){
            value = temp[0] + 32;
            setTemp([value, " °F"]);
        } else {
            value = temp[0] - 32;
            setTemp([value, " °C"]);
        }
    }
    const changeBackground = (icon) => {
        if (icon) {
            icon = parseInt(icon.slice(0, 2));
            if (icon === 1) {
                setBackground('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHuXyBfSLUZK8k7XSstXmHXU1sVBw_wkWVMw&usqp=CAU');
                setIcon("fas fa-sun")
            } else if ((icon >= 2 && icon <= 4) || icon === 50) {
                setBackground('https://diariolibre.blob.core.windows.net.optimalcdn.com/images/binrepository/nublado_11684706_20190524130057-focus-0-0-545-286.jpg');
                if (icon === 2) {
                    setIcon("fas fa-cloud-sun")
                } else if (icon === 3) {
                    setIcon("fas fa-cloud");
                } else if (icon === 4 || icon === 50) {
                    setIcon("fas fa-cloud");
                }
            } else if (icon >= 9 && icon <= 11) {
                setBackground('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHuXyBfSLUZK8k7XSstXmHXU1sVBw_wkWVMw&usqp=CAU');
                if (icon === 9) {
                    setIcon("fas fa-cloud-showers-heavy")
                } else if (icon === 10) {
                    setIcon("fas fa-cloud-sun-rain");
                } else if (icon === 11) {
                    setIcon("fas fa-poo-storm");
                }
            } else if (icon === 13) {
                setBackground('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHuXyBfSLUZK8k7XSstXmHXU1sVBw_wkWVMw&usqp=CAU');
                setIcon("fas fa-snowflake")
            }
        }
    }
   

    document.body.style = `background: url(${background}) no-repeat center center fixed;
    -webkit-background-size: cover;
    background-size: 100% 100%`;

    return (
        <div className='weather-card'>
            <header>
                <h1>Weather App</h1>
                <h2>{city},{country}</h2>
            </header>
            <main>
                <div>
                    <i className={iconUrl}></i>
                    <p>{temp}</p>
                </div>
                <div>
                    <h3>{weatherDescription}</h3>
                    <h3>Wind speed:{windSpeed}<span> Km</span></h3>
                    <h3>Clouds: {clouds}<span>%</span></h3>
                    <h3>Pressure: {pressure}<span> mb</span></h3></div>
            </main>
            <aside>
                <div>
                    <button onClick={handleTemperature}>Degrees F/C</button>
                </div>
            </aside>
        </div>
    );
};


export default Weather;
