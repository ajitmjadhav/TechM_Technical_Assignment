import { React, useState, useEffect } from 'react'
import './dashboardStyle.css'
import sunRise from '../images/sunRiseImage.jpg'
import sunSet from '../images/sunSetImage.jpg'
import raintW from '../images/rainyWeather.jpg'
import sunnyW from '../images/sunnyWeather.jpg'
import coludyW from '../images/cloudyWeather.jpg'
import { cityList } from './cityList.js'
import CurrentCard from './currentCard'
//react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [city, setCity] = useState('');
    const [currentObj, setCurrentObj] = useState([]);
    const [allObj, setAllObj] = useState([]);
    const [currentFlag, setCurrentFlag] = useState(false);
    const [tempFlag, setTempFlag] = useState(false)

    //function for getting city name from select field
    const handleChange = (e) => {
        const val = e.target.value;
        setCity(val);
    }
    //on add btn click get given city weather info
    const getWhetherReport = async () => {
        if (city) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c72b8ea826532e999747c102e212f63f`;
            const response = await fetch(url);
            const res = await response.json();
            setCurrentObj(res);
            // console.log(res);
            // alert('we get the data')
            toast.success('Data got from API');
            setCurrentFlag(true)
        }
        else {
            toast.error('please select a city');
        }
    }

    const reload = () => {
        console.log(allObj);
    }
    const saveAllData = () => {
        setCurrentFlag(false)
        const temp = allObj.find((obj) => obj.name === currentObj.name)
        if (temp) {
            toast.error('already saved this city');
        }
        else if (allObj) {
            setAllObj(() => [...allObj, currentObj]);
            toast.success('Saved successfully');
        }
        else {
            setAllObj([])
        }
    }
    const deleteCard = (id) => {
        // console.log(id);
        const filteredObj = allObj.filter((item) => item.id !== id);
        setAllObj(filteredObj);
        toast.success(`Card delete successfully`);
        if (allObj) {
            setCurrentObj([]);
        }
    }
    const tempConvert = () => {
        setTempFlag(!tempFlag);
    }
    return (
        <>
            <div className='wmg-container'>
                <div className='Navbar'>
                    <div className='nav-left'>
                        <p className='heading-primary'>Select:</p>
                        <div className="custom-select" >
                            <select onChange={handleChange} className='nav-select' >
                                <option >select a city</option>
                                {cityList.map((item, key) => {
                                    return (
                                        <option key={key} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button onClick={getWhetherReport} className='wmg-btn'>Add</button>
                    </div>
                    <div className='nav-right'>
                        <button className='wmg-btn'>Reload</button>
                    </div>
                </div>
                {currentFlag && <CurrentCard myData={currentObj} />}
                <div className='card-wrapper'>
                    <div className='cards-grid'>
                        {allObj && allObj.map((item, key) => {
                            const { id, coord, main, name, sys, weather } = item;
                            const myObj = ({
                                id: id,
                                cityName: name,
                                lat: coord.lat,
                                lon: coord.lon,
                                temp: main.temp,
                                feelsLike: main.feels_like,
                                country: sys.country,
                                sunrise: sys.sunrise,
                                sunset: sys.sunset,
                                icon: weather[0].icon,
                                description: weather[0].description,
                            });
                            let link = `http://openweathermap.org/img/w/${myObj.icon}.png`
                            return (
                                <div className='card' key={key}>
                                    <div className='card-header'>
                                        <p className=' heading-sec'>{myObj.cityName},{myObj.country}</p>
                                        <div className='svg-icons' onClick={() => deleteCard(myObj.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className='card-mid'>
                                        <div className='icon-with-detail'>
                                            <div className='icon-image'>
                                                <img src={link}></img>
                                            </div>
                                            <p className='icon-text'>{myObj.description}</p>
                                        </div>
                                        <div className='temp-wrapper' onClick={tempConvert}>
                                            {tempFlag
                                                ?
                                                <h1 className='temperature'>{Math.floor(myObj.temp)}<span>k</span></h1>
                                                :
                                                <h1 className='temperature'>{Math.floor(myObj.temp - 273)}<span>c</span></h1>}

                                            <h2 className='feels'>Feels Like:{Math.floor(myObj.feelsLike - 273)}<span>c</span> </h2>
                                        </div>
                                    </div>
                                    <div className='card-footer'>
                                        <div className='icon-with-detail'>
                                            <div className='icon-image'>
                                                <img src={sunRise}></img>
                                            </div>
                                            <p className='icon-text'>Sunrise <br /> {new Date(myObj.sunrise * 1000).toLocaleTimeString()}</p>
                                        </div>
                                        <div className='icon-with-detail'>
                                            <div className='icon-image'>
                                                <img src={sunSet}></img>
                                            </div>
                                            <p className='icon-text'>Sunset <br /> {new Date(myObj.sunset * 1000).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='dynamic-btn'>
                    <button onClick={saveAllData} className='wmg-btn'>Save</button>
                </div>
            </div >
            <ToastContainer
                position="top-right"
                autoClose={1000} />
        </>
    )
}
export default Dashboard