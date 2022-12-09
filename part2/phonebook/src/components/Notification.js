const Notification = ({ message,error }) => {
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };

    if (message === null || message === '') {
        return null
    }

    if (error) {
        return (<div style={errorStyle}>{message}</div>)
    }else {
        return (<div style={successStyle}>{message}</div>)
    }
};



export default Notification

