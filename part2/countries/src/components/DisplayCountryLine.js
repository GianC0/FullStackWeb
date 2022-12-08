import {useState} from "react";
import DisplayCountryFull from "./DisplayCountryFull";

const DisplayCountryLine = ({country}) => {
    //states
    const [countryFlag, setCountryFlag] = useState(false)

    //button handler
    const buttonHandler = (event) => {
        setCountryFlag(country)
    }
    const buttonDisplayer = () => {
        if (countryFlag)
            return <DisplayCountryFull country={country}></DisplayCountryFull>
    }
    return (
        <li key={country.name.common.toString()}>
            {country.name.common.toString()} <button onClick={buttonHandler}>show</button>
            {buttonDisplayer()}
        </li>
    )
}
export default DisplayCountryLine