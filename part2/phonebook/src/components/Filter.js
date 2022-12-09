const Filter = ({list,filter_str,deleteHandler}) => {
    return (
        <ul>
            {
                list.map(person => {
                if (person.name.toLowerCase().includes(filter_str.toLowerCase()))
                    return <li key={person.id}> {person.name} : {person.number} {<button onClick={() => deleteHandler(person) } >delete</button>}</li>
            })}
        </ul>
    )
}

export default Filter