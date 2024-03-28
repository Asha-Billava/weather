import React, { useEffect, useState } from 'react'
import Location from './location'
import Wheather from './wheather'
import axios from 'axios';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { IconList } from '../icons';




function Connect() {
    const navigate = useNavigate()

    const [city, setCity] = useState("")
    const [weatherInfo, setweatherInfo] = useState("")
    const [Img, setImg] = useState("")
    const [error, seterror] = useState(0)
    const [page, setpage] = useState(0)


    useEffect(() => {

        if (page == 1) {
            navigate(`/weather/${city !== "" && city.replace(" ", "")}`)
        } else {

            navigate("/weather");
        }
    }, [page])


    const getWeatherInfo = async (param) => {

        const ApiKey = "b7a8766ffa26a32945b874b8e4643c0f";
        const BaseUrl = "https://api.openweathermap.org/data/2.5";


        // e.preventDefault()
        const getDataByCity = `${BaseUrl}/weather?q=${city}&units=metric&appid=${ApiKey}`;
        const getDataByLatitude = `${BaseUrl}/weather?lat=${param?.latitude}&lon=${param?.longitude}&units=metric&appid=${ApiKey}`

        await axios.get(city !== '' ? getDataByCity : getDataByLatitude)
            .then((resp) => {
                setpage(1)
                let data = resp?.data
                let weatherdata = {
                    temperature: Math.floor(data?.main?.temp),
                    description: data?.weather[0].description,
                    location: data?.name,
                    feelsLike: Math.floor(data?.main?.feels_like),
                    humidity: data?.main?.humidity
                }

                // image //
                for (let i = 0; i < IconList.length; i++) {
                    if (data.weather[0].icon == IconList[i].icon) {
                        setImg(IconList[i].photo);
                    }

                }
                setCity(data?.name)
                setweatherInfo(weatherdata)

            }).catch((err) => {
                console.log(err)
                if (err?.response?.status) {
                    seterror(2)
                }
            })

    }


    return (
        <Routes>
            {page !== 1 ? (
                <>
                    <Route path="/" element={<Navigate to="/weather" />} />
                    <Route path="/weather" element={<Location city={city} setCity={setCity} getWeatherInfo={getWeatherInfo} error={error} seterror={seterror} />} />
                </>
            ) : (
                    <Route path="/weather/:city" element={<Wheather Img={Img} weatherInfo={weatherInfo} setCity={setCity} setpage={setpage} />} />
            )} 
            <Route path="*" element={<Location pageNotFound="" />} />
        </Routes>
    )
}

export default Connect