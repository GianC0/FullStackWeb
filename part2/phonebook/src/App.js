import {useState} from 'react';
import PeopleFilter from './components/PeopleFilter'
import FilterElement from "./components/FilterElement";
import FormEntry from "./components/FormEntry";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilter, setNewFilter] = useState('');


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
            <PeopleFilter list={persons} filter_str={newFilter} ></PeopleFilter>

        </div>
    )
}

export default App