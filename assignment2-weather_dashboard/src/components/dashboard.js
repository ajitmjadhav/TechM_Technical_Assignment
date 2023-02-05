import { React, useState, useEffect } from 'react'
import './dashboardStyle.css'
import sunRise from '../images/sunRiseImage.jpg'
import sunSet from '../images/sunSetImage.jpg'
import raintW from '../images/rainyWeather.jpg'
import sunnyW from '../images/sunnyWeather.jpg'
import coludyW from '../images/cloudyWeather.jpg'

const Dashboard = () => {
    const [city, setCity] = useState('');

    //function for getting city name from select field
    const handleChange = (e) => {
        const val = e.target.value;
        setCity(val);
    }
    //on add btn click get given city weather info
    const getWhetherReport = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c72b8ea826532e999747c102e212f63f`;
        const response = await fetch(url);
        const res = await response.json();
        console.log(res);
    }
    return (
        <div className='wmg-container'>
            <div className='Navbar'>
                <div className='nav-left'>
                    <p className='heading-primary'>Select:</p>
                    <div className="custom-select" >
                        <select onChange={handleChange} className='nav-select' >
                            <option >select a city</option>
                            <option value="pune">pune</option>
                            <option value="mumbai">mumbai</option>
                            <option value="goa">goa</option>
                            <option value="bihar">bihar</option>
                            <option value="punjab">punjab</option>
                        </select>
                    </div>
                    <button onClick={getWhetherReport} className='wmg-btn'>Add</button>
                </div>
                <div className='nav-right'>
                    <button className='wmg-btn'>Reload</button>
                </div>
            </div>
            <div className='card-wrapper'>
                <div className='cards-grid'>
                    <div className='card'>
                        <div className='card-header'>
                            <p className=' heading-sec'>Pune, India</p>
                            <div className='svg-icons'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </div>
                        </div>
                        <div className='card-mid'>
                            <div className='icon-with-detail'>
                                <div className='icon-image'>
                                    <img src={coludyW}></img>
                                </div>
                                <p className='icon-text'>Clear Sky</p>
                            </div>
                            <div className='temp-wrapper'>
                                <h1 className='temperature'>27<span>c</span></h1>
                                <h2 className='feels'>Feels Like: 25 <span>c</span> </h2>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='icon-with-detail'>
                                <div className='icon-image'>
                                    <img src={sunRise}></img>
                                </div>
                                <p className='icon-text'>Sunrise 7.35</p>
                            </div>
                            <div className='icon-with-detail'>
                                <div className='icon-image'>
                                    <img src={sunSet}></img>
                                </div>
                                <p className='icon-text'>Sunset 18.53</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='dynamic-btn'>
                <button className='wmg-btn'>Save</button>
            </div>
        </div >
    )
}
export default Dashboard