import React, { useEffect } from 'react'
import "./style.css"

function Location(props) {
    const handleOnclick = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    props.getWeatherInfo(position?.coords, '')
                },
                error => {
                    console.log(error.message);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className='MainContainer ' >
            <div class="card text-center">
                <div class="card-header"> Weather App</div>
                <div class="card-body">
                    {/* <input type="text" className="form-control inputclass" value={props.city} placeholder="Enter city name" autoFocus="off"
                        onChange={(e) => {
                            props.seterror(0)
                            let text = e.target.value
                                .replace(/^ /, '')
                            props.setCity(text)
                            props?.getWeatherInfo('param', e.target.value)


                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.target.value !== "") {
                                props?.getWeatherInfo()
                            }
                            else {
                                props?.seterror(1)
                            }
                        }}
                    /> */}
                    <select className='form-control' 
                    value={props.city}
                    onChange={(e) => {
                        props.seterror(0)
                        let text = e.target.value
                            .replace(/^ /, '')
                        props.setCity(text)

                        props?.getWeatherInfo('', e.target.value)


                    }} 
                  
                    >
                        <option selected>Select City</option>
                        <option value={'Bengaluru'}>Bengaluru</option>
                        <option value={'mumbai'}>Mumbai</option>
                        <option value={'london'}>London</option>
                        <option value={'Udupi'}>Udupi</option>
                    </select>
                    <span className='error'>{props.error === 1 ? "*Please enter city" : props.error === 2 ? "*City not found" : ""}</span>
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