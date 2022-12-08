import {useState} from "react";
import axios from 'axios'
import {useEffect} from "react";
import Filter from "./components/Filter";

function App() {
    const [newFilter, setNewFilter] = useState('');
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const [countries, setCountries] = useState([])
    const hook = () => {

        const eventHandler = response => {
            setCountries(response.data)
        }
        const promise = axios.get('https://restcountries.com/v3.1/all')
        promise.then(eventHandler)
    };
    useEffect(hook, []);

    return (
        <div>
            <h2>Find Countries</h2>
            <div>filter: <input value={newFilter} onChange={handleFilterChange}/></div>
            <Filter countries={countries} filter_str={newFilter}> </Filter>
        </div>
    )
}

export default App;
