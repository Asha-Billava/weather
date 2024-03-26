import React from 'react'
import "./style.css"

function Wheather() {
    return (
        <div className='MainContainer ' >
            <div class="card text-center">
                <div class="card-header"> Weather App</div>
                <div class="card-body">
                    {/* <input type="text" className="form-control inputclass" placeholder="Enter city name" autoFocus="off" />
                    <div className='cardDiv'>
                        <div></div><h6>or</h6><div></div>
                    </div> */}
                    <div class="card-footer">
                        <small class="text-body-secondary">Last updated 3 mins ago</small>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Wheather