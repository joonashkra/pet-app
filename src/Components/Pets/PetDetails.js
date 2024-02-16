import React, { useEffect, useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ListPetVisits from '../Visits/ListPetVisits';
import UpdatePet from './UpdatePet';
import './PetDetails.css'
import ErrorPage from '../ErrorPage';

export default function PetDetails(props) {
  const accessToken = sessionStorage.getItem('accessToken')
  const { id } = useParams()
  const [pet, setPet] = useState()
  const [doctorComment, setDoctorComment] = useState("")
  const [error, setError] = useState(null)
  const [ownerName, setOwnerName] = useState()
  const userId = props.userId
  const navigate = useNavigate();

  console.log(userId)

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/pets/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })

        if (!response.ok) {
          setTimeout(() => {
            setError(<ErrorPage/>)
          }, 200)
          return
        }

        const petData = await response.json()
        setPet(petData)
      } 
      catch (error) {
        console.error('Error:', error)
      }
    }

    const getDoctorComment = (id) => {
      const storedComment = localStorage.getItem(`doctorComments/${id}`)
      if (storedComment) {
        setDoctorComment(storedComment)
      }
    }

    fetchPetDetails()
    getDoctorComment(id)
    
  }, [id, accessToken])

  
  useEffect(() => {
    const fetchUserName = async () => {
      if(userId > 0) return
      try {
        if (!pet) return; 
        const response = await fetch('http://localhost:4000/users', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userData = await response.json()
        const owner = userData.find(user => user.id === pet.ownerId)
        setOwnerName(owner.name)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUserName()
  }, [accessToken, pet, userId]);

  const returnToPets = () => {
    navigate("/pets")
  }

  if (!pet || error) {
    return <div>{error}</div>
  }

  const handleDoctorCommentChange = (e) => {
    const commentValue = e.target.value
    setDoctorComment(commentValue)
    localStorage.setItem(`doctorComments/${id}`, commentValue)
  }

  return (
      <Container className='PetDetails'>
          <div className='card'>
            <h4 className='card-header'>{pet.name}'s Details</h4>
            <div className='card-body'>
              <p>Pet ID: {pet.id}</p>
              <p>Type: {pet.petType.toUpperCase()}</p>
              <p>Status: {pet.status.toUpperCase()}</p>
              <p>Date of Birth: {pet.dob}</p>
              {userId === 0 ? <p>Owner: {ownerName}</p> : null}
              {userId === 0 && (
                <div className='DoctorSection'>
                  <hr/>
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Notes:</label> 
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={doctorComment} onChange={handleDoctorCommentChange}></textarea>
                  <br/>
                  <label>Update {pet.name}'s status:</label>
                  <UpdatePet petId={id} petStatus={pet.status} accessToken={accessToken}/>
                </div>
              )}
            </div>
          </div>
        <Row>
          <ListPetVisits petId={id} petName={pet.name} petStatus={pet.status} accessToken={accessToken} userId={userId}/>
        </Row>
        <Button id='GoBackButton' onClick={returnToPets}>Return to Pets</Button>
      </Container>
  )
}