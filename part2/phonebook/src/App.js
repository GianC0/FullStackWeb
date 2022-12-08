import Filter from './components/Filter'
import FilterElement from "./components/FilterElement";
import FormEntry from "./components/FormEntry";
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilter, setNewFilter] = useState('');

    const hook = () => {
        console.log('effect')

        const eventHandler = response => {
            console.log('promise fulfilled')
            setPersons(response.data)
        }
        const promise = axios.get('http://localhost:3001/persons')
        promise.then(eventHandler)
    };

    console.log("rendering "+persons.length+" people");
    useEffect(hook,[]);


    const handleNameChange = (event) => {
        setNewName(event.target.value)
    };
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    };
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const checkNameExistance = () => {
        let out = false
        persons.forEach(person => {
            if (!out && person.name === newName) {
                out = true
            }
        })
        return (out)
    };
    const submitForm = (event) => {
        event.preventDefault()
        if (!checkNameExistance()) {
            const nameObject = {name: newName, number: newNumber, id: persons.length+1}
            setPersons(persons.concat(nameObject))
            setNewName('')
            setNewNumber('')
        }

        else {
            alert(`The name: ${newName} is already in the Phonebook`)
            setNewName('')
        }
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <FilterElement value={newFilter} handler={handleFilterChange} ></FilterElement>
            <h2>Add new</h2>
            <form onSubmit={submitForm}>
                <FormEntry entry={"name"} newState={newName} handler={handleNameChange}></FormEntry>
                <FormEntry entry={"number"} newState={newNumber} handler={handleNumberChange}></FormEntry>
                <div><button type="submit">add</button></div>
            </form>


            <h2>Numbers</h2>
            <Filter list={persons} filter_str={newFilter} ></Filter>

        </div>
    )
}

export default App