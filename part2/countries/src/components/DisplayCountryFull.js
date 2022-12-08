import axios from "axios";
import {useEffect, useState} from "react";

const DisplayCountryFull = ({country}) => {
    const get_langs = (langs) => {
        const ls = Object.values(langs)
        return (
            <ul>
                {ls.map(l => {return(<li key={l}>{l}</li>) })}
            </ul>
        )


    }

    /*
    const [weather, setWeather] = useState([])

    const hook = (city) => {

        const eventHandler = response => {
            setWeather(response.data)
        }
        const promise = axios.get(('https://goweather.herokuapp.com/weather/'+city.toString()))
        promise.then(eventHandler)
    };
    useEffect(hook, []);
     */

    return (
        <div>
            <h1>{country.name.common.toString()}</h1>
            <div> capital: {country.capital[0].toString()}</div>
            <div> area: {country.area.toString()} </div>
            <div>
                <h2>Languages</h2>
                {get_langs(country.languages)}
                <div> <img src={country.flags.png} alt="img problems"/> </div>
            </div>
            <div>
                <h2>Weather in {country.capital[0].toString()}</h2>
                <img src={"https://wttr.in/"+encodeURIComponent(country.capital[0].toString()+".png")} alt={"error"}/>

            </div>
        </div>
    )
}
export default DisplayCountryFull