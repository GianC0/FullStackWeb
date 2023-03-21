import { createContext, useReducer } from 'react'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 5
}

const NotificationReducer = (state, action) => {
  console.log("action ",action)
  switch (action.type) {
    case "SHOW":
      return (<div style={style}>{action.payload}</div>)
    default:
      return <div></div>
  }
}



const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, 0)

  return (
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
  )
}

export default NotificationContext
