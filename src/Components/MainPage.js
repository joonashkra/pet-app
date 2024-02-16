import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ListPets from './Pets/ListPets';
import ListVisits from './Visits/ListVisits'
import './MainPage.css'

export default function MainPage(props) {
    const accessToken = props.accessToken
    const navigate = useNavigate()

    const handleLogOut = () => {
      sessionStorage.removeItem('accessToken')
      navigate('/')
    }

    return (
        <Container className='MainPage'>
          <ListPets accessToken={accessToken}/>
          <ListVisits accessToken={accessToken}/>
          <Button onClick={handleLogOut} id="LogOutButton">Log Out</Button>
        </Container>
      )
}