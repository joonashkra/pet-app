import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ListPets from './Pets/ListPets';
import ListVisits from './Visits/ListVisits'
import './CSS/MainPage.css'

function MainPage() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken')

    const handleLogOut = () => {
      localStorage.removeItem('accessToken')
      navigate('/')
    }

    return (
        <div className='MainPage'>
          {accessToken ? (
            <div>
                <Button onClick={handleLogOut} id="LogOutButton">Log Out</Button>
                <ListPets />
                <ListVisits />
            </div>
          ) : (
            <div>
              <p style={{color: "red"}}>Error. Please log in.</p>
            </div>
          )}
        </div>
      )
}

export default MainPage