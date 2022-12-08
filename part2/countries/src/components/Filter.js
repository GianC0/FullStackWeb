import {useState} from "react";
import DisplayCountryFull from "./DisplayCountryFull";
import DisplayCountryLine from "./DisplayCountryLine";

const Filter = ({countries,filter_str}) =>{

    //tool function
    const filter_countries = () => {
        let filt_list = []

        countries.forEach(country => {
            if (country.name.common.toLowerCase().includes(filter_str.toLowerCase()))
                filt_list.push(country)
        })

        return filt_list
    }

    const generate_out = () => {
        const l = filter_countries()

        if (l.length===0) {return (<div> 'No match found'</div>)}
        if (l.length===1) {return (<DisplayCountryFull country={l[0]}></DisplayCountryFull>  )}
        if (l.length!==1 && l.length<=10 ) {
            return (
                <ul>
                    {l.map(country => {return( <DisplayCountryLine country={country}></DisplayCountryLine> )})}
                </ul>
            )
        }
        else return(<div>Too many matches, specify filter</div>)

    }


    return(generate_out())
}
export default Filter