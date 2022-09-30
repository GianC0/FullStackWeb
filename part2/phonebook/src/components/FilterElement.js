const FilterElement = ({value,handler}) => {
    return(
        <div>filter: <input value={value} onChange={handler}/></div>
    )
}

export default FilterElement