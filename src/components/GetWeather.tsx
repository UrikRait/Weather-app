import axios from "axios"
import { useQuery } from 'react-query'
import { WheatherPage } from "./WheatherPage"

async function fetchIp() {
    const { data } = await axios.get(
        'https://api.ipify.org?format=json'
    )
    return data.ip
}

async function fetchWeather() {
    const ipAddress = await fetchIp()
    const { data } = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=833224568d694db9b0763116232709&q=${ipAddress}&lang=ru`
    )

    return data

}
export function GetWeather() {
    const { data,isLoading, isError } = useQuery('weatherData', fetchWeather, { refetchOnWindowFocus: false, keepPreviousData: true })
    if (isLoading) {
        return (
            <div className="loading">
                <div className="loading__anim">
                    <img src="img/loading.svg" alt="" />
                </div>
            </div>
        )
    }
    if (isError) {
        return <p>Ошибка загрузки данных</p>
    }

    return (
        <>
            <WheatherPage data={data} />
        </>
    )

}