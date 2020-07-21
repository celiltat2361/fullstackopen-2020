import React, {useState, useEffect} from 'react';
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonService from './services/PersonService';
import PersonList from './components/Persons';


const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

 
    const [message, setMessage] = useState(null)
    const [type, setType] = useState('')
    const [className, setClassName] = useState("normalMessage")

    

    useEffect(() => {
        console.log('effect')
        PersonService
        .getAll()
        .then(response => {
            console.log('promise fullfilled')
            setPersons(response.data)
        })
        
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const add = true
        const personId = 0

        persons.forEach((pers) => {
            if (pers.name === newName) {
                add = false
                personId = pers.id
            }
        })

        const personObject = {name: newName, number: newNumber}

        if (add) {
            PersonService 
            .create(personObject)
            .then(response => {
                setPersons(persons.concat(response.data))
            })
            .catch(error => {
                console.log(error.response.data.error)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            setClassName("normalMessage")
            setMessage(`Added ${newName}`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            
        }else {
            const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

            if(result) {
                PersonService.update(personId, personObject)
                .then(response => {
                    setPersons(persons.map(person => person.id !==personId ? person : response.data))
                })
                .catch(error => {
                    setClassName("normalMessage")
                    setMessage(`Updated number for ${newName}`)
                    setTimeout(() =>{
                        setMessage(null)
                    }, 5000)
                });
                setNewName('')
                setNewNumber('')
                setClassName("normalMessage")
            }
        }

    }

    const shownNames = search.length > 0
        ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
        : persons
        persons.concat(persons.name, persons.number)

        const handleDelete = (id, name) => {
            let result = window.confirm(`Delete ${name} ?`);
    
            if (result) {
                let newPersons = persons.filter((value) => {
                    return value.id !== id
                })
                PersonService.remove(id)
                    .then(setPersons(newPersons))
    
                setClassName("normalMessage")
                setMessage(`Removed ${newName}`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            }
    
            console.log(`Objects id is: ${id}`);
    
        }
    
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <Notification message={message} type={type} className={className} setType={setType}/>
                <Filter search={search} handleSearchChange={handleSearchChange}/>

                <div>
                    <h3>add a new</h3>
                  <PersonForm addPerson={addPerson} newName={newName}
                              newNumber={newNumber} handleNameChange={handleNameChange}
                              handleNumberChange={handleNumberChange} />
                </div>

                <h3>Numbers</h3>
                <PersonList shownNames={shownNames} persons={persons} search={search} onRemoveClick={handleDelete} />


            </form>

        </div>
    )


}
export default App
