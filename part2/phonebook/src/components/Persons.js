import React from "react";

const PersonList =({persons, search, onRemoveClick}) => {
    return (
        persons.length ?
        <ul style={{listStyle: 'none', padding: 0}}>
            {
                persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
                .map(person => (
                    <li key={person.name}>
                        {person.name} {person.number} &nbsp;
                        <button onClick={() => onRemoveClick(person.id, person.name)}>Delete</button>
                    </li>
                ))
            }
        </ul>
        :
        <p>Loading contacts...</p>
    );
};

   

export default PersonList;