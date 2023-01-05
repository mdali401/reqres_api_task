import {useEffect, useState}  from 'react'
import {useDispatch} from 'react-redux'
import {add} from './features/users/usersSlice'
import { ClipLoader } from 'react-spinners'
import './App.css';

function App() {
  // Redux
  const dispatch = useDispatch()

  // To store total user count
  const [totalUsers, setTotalUsers] = useState(0)
  // To store individual user data
  const [user, setUser] = useState(null)
  // To handle users list loading and each user loading
  const [isUserListLoading, setIsUserListLoading] = useState(true)
  const [isUserLoading, setIsUserLoading] = useState(false)

  // To create and return buttons equal to total users
  const usersToButtons = () => {
    let userButtons = []
    for(let count=1; count <= totalUsers; count++)
    {
      userButtons.push(
        <button key={count} id={count}>{count}</button>
      )
    }
    return userButtons
  }

  // To fetch each user and set state
  const getAndSetUser = (userId) => {
    // To show loading indicator
    setIsUserLoading(true)
    // Using timeout just to see loading indicator
    setTimeout(() => fetch(`https://reqres.in/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .then(() => setIsUserLoading(false))
    , 500)
  }

  // To handle click on buttons
  const handleButtonClick = (e) => {
    // To check if button is clicked
    if(e.target.tagName === 'BUTTON')
    {
      getAndSetUser(e.target.id)
    }
  }

  // To fetch users list and store in redux and set user count
  useEffect(() => {
    // Using timeout just to see loading indicator
    setTimeout(() => fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(data => {dispatch(add(data)); setTotalUsers(data?.total)})
      .then(() =>  setIsUserListLoading(false))
    , 1000)
  }, [])


  return (
    <div className="App">
      {/* Starting loading indicator for users list */}
      {isUserListLoading ? <ClipLoader color='darkgreen'/> 
      :
      <>
        {/* Container for user card */}
        <div className='container'>
          {/* Conditional rendering user card */}
          {user?.data ? 
            <div id='usercard'>
              {/* Conditional rendering of loading indicator for each user */}
              {isUserLoading ? <ClipLoader color='darkred'/> 
                :
                <>
                  <p id='name'>{user.data.first_name} {user.data.last_name}</p>
                  <img src={user.data.avatar} alt='avatar'></img>
                  <p id='email'>{user.data.email}</p>
                </>
              } 
            </div>
          :
            <div id='usercard'>
              {/* Conditional rendering of loading indicator only for initial user fetch */}
              {isUserLoading ? <ClipLoader color='darkred'/> 
                :
                <h2>Click a button to view user details</h2>
              }
            </div>
          }
        </div>
        
        {/* Container for users buttons */}
        <div
          className='container container_buttons'
          onClick={(e) => handleButtonClick(e)} 
          >
            {usersToButtons()}
        </div>
      </>
      }
    </div>
  );
}

export default App;
