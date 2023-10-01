import { useEffect, useState } from 'react';
import { Idata } from "../common/IData";

export function WheatherPage({ data }: Idata) {
    const [weatherBg, setWeatherBg] = useState('')
    useEffect(() => {

        if (data.current.condition.text.includes('дождь')) {
            setWeatherBg('img/rain.jpg');
        } else if (data.current.is_day && data.current.cloud) {
            setWeatherBg('img/cloud.jpg');
        } else if (data.current.is_day) {
            setWeatherBg('img/day.jpg');
        } else {
            setWeatherBg('img/night.jpg');
        }
    }, [data])
    return (
        <div className="container">
            <p className="wheather__name">Погода</p>
            <section className="today">
                <div className='today__bg' style={{ backgroundImage: `url(${weatherBg})`}} />
                <div className="today__box">
                    <div className="today_city">{data.location.name}</div>
                    <div className="today__flex">
                        <div className="today__weather">
                            <p className="today__temp">{data.current.temp_c}&deg;С</p>
                            <img className="today__ico" src={`${data.current.condition.icon}`} alt={`${data.current.condition.icon}`} />
                        </div>
                        <div className="today__info">
                            <p className="today__text">{data.current.condition.text}</p>
                            <div className="today__feelslike">Ощущается как {data.current.feelslike_c}&deg;C</div>
                        </div>
                    </div>
                    <div className="today__flex today__second">
                        <div className="today__wind">Скорость ветра {data.current.wind_mph} м/с</div>
                        <div className="today__humidity">Влажность {data.current.humidity}</div>
                        <div className="today_pressure">{data.current.pressure_mb} мм рт. ст.</div>
                    </div>
                </div>
            </section>
        </div>
    )
}
