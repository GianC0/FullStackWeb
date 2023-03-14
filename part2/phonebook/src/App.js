import personsService from "./services/personsService";
import Filter from './components/Filter'
import FilterElement from "./components/FilterElement";
import FormEntry from "./components/FormEntry";
import { useState, useEffect } from 'react'
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilter, setNewFilter] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [notifMessage, setNotifMessage] = useState('')


    useEffect( () => {

        personsService.getAll().then(data => {setPersons(data)} )
        },[]);


    const handleNameChange = (event) => {
        setNewName(event.target.value)
    };
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    };
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
    const handleDelete = (person) => {
        if (window.confirm(`Sure to delete ${person.name}?`)){
            personsService.remove(person.id)
                .then(setPersons(persons.filter(p => p.name !== person.name)) )
        }

    }
    const checkNameExistence = () => {
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
        if (!checkNameExistence()) {
            const contactObject = {name: newName, number: newNumber}
            console.log("requesting add of "+newName+" "+newNumber)
            console.log(contactObject)
            personsService.create(contactObject).then( () => {
                setPersons(persons.concat(contactObject));
                setNewName('');
                setNewNumber('');
                setNotifMessage(`${newName} has been added`)
                setTimeout(() => {
                    setNotifMessage(null)
                }, 2000)
            }).catch(error => {
                setErrorMessage(error.message)
                setNewName('')
                setNewNumber('')
            })


        }

        else {
            if(window.confirm(`The name: ${newName} is already in the Phonebook. Wanna update it?`)){
                let id = 0;
                persons.forEach(person => {if (person.name === newName) {id = person.id}});
                const contactObject = {name: newName, number: newNumber, id: id };
                personsService.update(id,contactObject)
                    .then(() => {
                        personsService.getAll().then(data => {
                            setPersons(data);
                            setTimeout(() => {
                                setNotifMessage(null)
                            }, 2000)})
                        setNewName('');
                        setNewNumber('');
                        setNotifMessage(`${newName}'s number has been updated`)
                    })
                    .catch(error => {
                        console.log(error)
                        setErrorMessage(error.message)
                        setNewName('')
                        setNewNumber('')
                    })
            }

            else{setNewName('')}

        }
    };

    return (
        <div>
            <Notification message={errorMessage} error={true} ></Notification>
            <Notification message={notifMessage} error={false} ></Notification>
            <h1>Phonebook</h1>
            <FilterElement value={newFilter} handler={handleFilterChange} ></FilterElement>
            <h2>Add new</h2>
            <form onSubmit={submitForm}>
                <FormEntry entry={"name"} newState={newName} handler={handleNameChange}></FormEntry>
                <FormEntry entry={"number"} newState={newNumber} handler={handleNumberChange}></FormEntry>
                <div><button type="submit">add</button></div>
            </form>


            <h2>Numbers</h2>
            <Filter list={persons} filter_str={newFilter} deleteHandler={handleDelete} ></Filter>

        </div>
    )
}

export default App