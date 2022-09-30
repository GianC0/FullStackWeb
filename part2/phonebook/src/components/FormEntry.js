const FormEntry = ({entry,newState,handler}) => {
    return(
        <div>{entry}: <input value={newState} onChange={handler}/></div>
    )




}
export default FormEntry