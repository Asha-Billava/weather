import React, { useState } from 'react'
import Location from './location'
import Wheather from './wheather'
import axios from 'axios';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import cloud from "../assets/cloudy.png"
import tunder from "../assets/thunderstorm.png"
import clear from "../assets/clear.png"
import drizzle from "../assets/drizzle.png"
import rain from "../assets/rain.png"
import snow from "../assets/snow.png"
import mist from "../assets/mist.png"




function Connect() {
    const navigate = useNavigate()

    const [city, setCity] = useState("")
    const [weatherInfo, setweatherInfo] = useState("")
    const [Img, setImg] = useState("")



    const getWeatherInfo = async (param) => {

        const ApiKey = "b7a8766ffa26a32945b874b8e4643c0f";
        const BaseUrl = "https://api.openweathermap.org/data/2.5";


        // e.preventDefault()
        const getDataByCity = `${BaseUrl}/weather?q=${city}&units=metric&appid=${ApiKey}`;
        const getDataByLatitude = `${BaseUrl}/weather?lat=${param?.latitude}&lon=${param?.longitude}&units=metric&appid=${ApiKey}`


        await axios.get(city !== '' ? getDataByCity : getDataByLatitude)
            .then((resp) => {

                let data = resp?.data

                let weatherdata = {
                    temperature: Math.floor(data?.main?.temp),
                    description: data?.weather[0].description,
                    location: data?.name,
                    feelsLike: Math.floor(data?.main?.feels_like),
                    humidity: data?.main?.humidity
                }

                switch (data.weather[0].icon) {
                    case "11d" && "11n ":
                        setImg(tunder)
                        break;
                    case "02d" && "02n" && "03d" && "03n" && "04d" && "04n":

                        setImg(cloud)
                        break;
                    case "01d" || "01n":
                        setImg(clear)
                        break;
                    case "50d" || "50n":
                        setImg(mist)
                        break;
                    case "13d" || "13n":
                        setImg(snow)
                        break;
                    case "10d" || "10n":
                        setImg(rain)
                        break;
                    case "09d" || "09n":
                        setImg(drizzle)
                        break;
                    default:
                        setImg(clear)
                        break;
                }

                setweatherInfo(weatherdata)
                navigate(`/weather/${city !== "" ? city.replace(" ", "") : data?.name.replace(" ", "")}`)

            }).catch((err) => {
                console.log(err)
            })

    }



    return (
        <Routes>
            <Route path="/" element={<Navigate to="/weather" />} />
            <Route path="/weather" element={<Location city={city} setCity={setCity} getWeatherInfo={getWeatherInfo} />} />
            <Route path="/weather/:city" element={<Wheather Img={Img} weatherInfo={weatherInfo} setCity={setCity} />} />
            <Route path="*" element={<Location pageNotFound="" />} />
        </Routes>
    )
}

export default Connect