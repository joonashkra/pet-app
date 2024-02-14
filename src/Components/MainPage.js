import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ListPets from './Pets/ListPets';
import ListVisits from './Visits/ListVisits'
import './MainPage.css'

function MainPage() {
    const accessToken = sessionStorage.getItem('accessToken')
    const navigate = useNavigate()

    const handleLogOut = () => {
      sessionStorage.removeItem('accessToken')
      navigate('/')
    }

    return (
        <div className='MainPage'>
          {accessToken ? (
            <div>
                <ListPets accessToken={accessToken}/>
                <ListVisits accessToken={accessToken}/>
                <Button onClick={handleLogOut} id="LogOutButton">Log Out</Button>
            </div>
          ) : (
            <div>
              <h1 style={{color: "red"}}>Error. Page not found.</h1>
            </div>
          )}
        </div>
      )
}

export default MainPage