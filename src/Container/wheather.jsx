import React from 'react'
import "./style.css"
import { useNavigate } from 'react-router-dom'
import cloud from "../assets/cloudy.png"
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';


function Wheather(props) {

    const navigate = useNavigate()
    const location=useLocation()


    useEffect(() => {
        props.getWeatherInfo("", location.state.palce)
    }, [])
    



    return (
        <div className='MainContainer ' >
            <div class="card text-center">
                <div class="card-header" >
                    <i className="backarrow  bi-arrow-left"
                        onClick={() => {
                            navigate("/weather");
                            props.setpage(0)
                            props.setCity("")

                        }}>
                    </i>&nbsp;&nbsp;
                    Weather App
                </div>
                <div class="card-body" >
                    <div style={{ width: "100%" }} className='InsideCardbody container'>

                        <div style={{ marginTop: "20px" }}><img src={props.Img} height={95} width={95}></img></div>
                        <br></br>
                        <h1>{props.weatherInfo.temperature}°C</h1>

                        <h6>{props.weatherInfo.description}</h6>
                        <p style={{ fontSize: "13.2px" }}><i class="bi bi-geo-alt"></i> {props.weatherInfo.location}</p>

                    </div>

                </div>
                <div class="card-footer">
                    <div className='footerInside'>
                        <i class="bi bi-thermometer-sun"></i>
                        <div className='temperature'><span style={{ marginBottom: "-0.3rem", fontSize: "21px" }}>{props.weatherInfo.feelsLike}°C</span>
                            <span style={{ fontSize: "12px" }}>Feels Like</span></div>
                    </div>
                    <div className='horizontal'></div>

                    <div className='footerInside'>
                        <i className="bi bi-droplet-half"></i>
                        <div className='temperature'><span style={{ marginBottom: "-0.3rem", fontSize: "21px" }}>{props.weatherInfo.humidity}%</span>
                            <span style={{ fontSize: "12px" }}>Humidity</span></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Wheather