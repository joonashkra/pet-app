import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ListPets from './Pets/ListPets';
import ListVisits from './Visits/ListVisits'
import './CSS/MainPage.css'


function MainPage() {
    const navigate = useNavigate();
    const accessToken = sessionStorage.getItem('accessToken')

    const handleLogOut = () => {
      sessionStorage.removeItem('accessToken')
      navigate('/')
    }

    return (
        <div className='MainPage'>
          {accessToken ? (
            <div>
                <Button onClick={handleLogOut} id="LogOutButton">Log Out</Button>
                <ListPets token={accessToken}/>
                <ListVisits token={accessToken}/>
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