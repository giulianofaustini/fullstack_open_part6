import { useSelector } from 'react-redux'


const Notification = () => {

  const notification = useSelector( state => state.notification)

  const style = {
    fontSize: '30px',
    color: 'white',
    backgroundColor: 'green',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification){
    return null
  } else {
    return (
      <div style={style}>
      {notification}
      </div>
    )
  }

}

export default Notification

