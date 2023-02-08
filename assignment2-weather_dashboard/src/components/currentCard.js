import React from 'react'
import sunRise from '../images/sunRiseImage.jpg'
import sunSet from '../images/sunSetImage.jpg'

const CurrentCard = (prop) => {
    console.log(prop);
    const { id, coord, main, name, sys, weather } = prop.myData;
    // console.log(coord);
    // console.log(main);
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
        <div className='card currCard' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '50%', margin: '0 auto', backgroundColor: 'rgb(225, 203, 246)', padding: '10px', flexWrap: 'wrap' }}>
            <div className='card-header'>
                <p className=' heading-sec'>{myObj.cityName},{myObj.country}</p>
            </div>
            <div className='card-mid'>
                {/* <div className='icon-with-detail'>
                    <div className='icon-image'>
                        <img src={link}></img>
                    </div>
                    <p className='icon-text'>{myObj.description}</p>
                </div> */}
                <div className='temp-wrapper'>
                    <h1 className='temperature'>{Math.floor(myObj.temp - 273)}<span>c</span></h1>
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
}

export default CurrentCard