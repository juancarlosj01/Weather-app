import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const useHook = () =>{
    
    const [data, setData] = useState({});
    
   let city = data.name
   let country = data.sys?.country
   let temperature = Math.round(data.main?.temp -273.15)
   let windSpeed = data.wind?.speed
   let clouds = data.clouds?.all
   let pressure = data.main?.pressure
   let weatherDescription = data.weather?.[0].description
   let icon = data.weather?.[0].icon
    


    useEffect(() =>{

        const success = pos =>{
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7b656a2f4e5c2805a52d43259a8f8879`)
            .then(res => setData(res.data));
        }
        navigator.geolocation.getCurrentPosition(success);
    },[]);

  

    console.log(data);

    return {city, country, temperature, windSpeed, clouds, pressure, weatherDescription, icon};
}

export default useHook
