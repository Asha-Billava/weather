import React from 'react'
import "./style.css"
import { useNavigate } from 'react-router-dom'

function Location(props) {
    const navigate = useNavigate()

    const handleOnclick = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    props.getWeatherInfo(position?.coords)
                },
                error => {
                    console.log(error.message);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };
    // navigate("/weather/benglore")

    return (
        <div className='MainContainer ' >
            <div class="card text-center">
                <div class="card-header"> Weather App</div>
                <div class="card-body">
                    <input type="text" className="form-control inputclass" value={props.city} placeholder="Enter city name" autoFocus="off"
                        onChange={(e) => { props.setCity(e.target.value) }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.target.value !== "") {
                                props.getWeatherInfo()
                            }
                        }}
                    />
                    <div className='cardDiv'>
                        <div></div><h6>or</h6><div></div>
                    </div>
                    <button class="btn btn-primary" onClick={handleOnclick}>Get Device Location</button>
                </div>
            </div>
        </div >
    )
}

export default Location