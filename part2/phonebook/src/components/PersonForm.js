import React from "react";

const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName}
                             onChange={handleNameChange}/>
            </div>
            <div>
                number: <input valu={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm

