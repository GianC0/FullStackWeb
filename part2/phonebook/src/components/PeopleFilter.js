const PeopleFilter = ({list,filter_str}) => {
    return (
        <ul>
            {list.map(person => {
                if (person.name.toLowerCase().includes(filter_str.toLowerCase()))
                    return <li key={person.id}> {person.name} : {person.number}</li>
            })}
        </ul>
    )
}

export default PeopleFilter