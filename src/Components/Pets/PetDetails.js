import React, { useEffect, useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ListPetVisits from '../Visits/ListPetVisits';
import UpdatePet from './UpdatePet';
import './PetDetails.css'
import { GetOwnerId } from '../GetOwnerId';

function PetDetails() {
  const { id } = useParams()
  const [pet, setPet] = useState()
  const ownerId = GetOwnerId()

  const accessToken = localStorage.getItem("accessToken")

  const [doctorComment, setDoctorComment] = useState("")

  useEffect(() => {
    const storedComment = localStorage.getItem(`doctorComments/${id}`)
    if (storedComment) {
      setDoctorComment(storedComment)
    }
  }, [id])

  const handleDoctorComment = (e) => {
    const commentValue = e.target.value
    setDoctorComment(commentValue)
    localStorage.setItem(`doctorComments/${id}`, commentValue)
  }

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/pets/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (response.ok) {
          const petData = await response.json()
          setPet(petData)
        } else {
          console.error('Failed to fetch pet details.')
        }
      } catch (error) {
        console.error('Error fetching pet details:', error)
      }
    }

    fetchPetDetails();
  }, [id, accessToken])

  if (!pet) {
    return <p style={{color: "red"}}>Failed to load pet details</p>
  }

  return (
    <div className='PetDetails'>
    {accessToken ? (
      <Container>
          <div className='card'>
            <h4 className='card-header'>{pet.name}'s Details</h4>
            <div className='card-body'>
              <p>Pet ID: {pet.id}</p>
              <p>Type: {pet.petType.toUpperCase()}</p>
              <p>Status: {pet.status.toUpperCase()}</p>
              <p>Date of Birth: {pet.dob}</p>
              <hr/>
              {ownerId === 0 && (
                <div className='DoctorSection'>
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Notes:</label> 
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={doctorComment} onChange={handleDoctorComment}></textarea>
                  <br/>
                  <label>Update {pet.name}'s status:</label>
                  <UpdatePet id={id} status={pet.status}/>
                </div>
              )}
            </div>
          </div>
        <Row>
          <ListPetVisits petId={id} petName={pet.name} petStatus={pet.status}/>
        </Row>
        <Button id='GoBackButton'>Go Back</Button>
      </Container>
    ) : (
      <div>
        <p style={{color: "red"}}>Error. Please log in.</p>
      </div>
    )}
    </div>
  );
}

export default PetDetails;
