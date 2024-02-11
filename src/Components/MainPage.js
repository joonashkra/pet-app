import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ListPets from './Pets/ListPets';
import ListVisits from './Visits/ListVisits'
import './CSS/MainPage.css'

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
                <ListPets token={accessToken}/>
                <ListVisits token={accessToken}/>
                <Button onClick={handleLogOut} id="LogOutButton">Log Out</Button>
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