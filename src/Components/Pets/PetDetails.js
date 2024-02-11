import React, { useEffect, useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ListPetVisits from '../Visits/ListPetVisits';
import UpdatePet from './UpdatePet';
import './PetDetails.css'
import { GetOwnerId } from '../GetOwnerId';

function PetDetails() {
  const { id } = useParams()
  const [pet, setPet] = useState()
  const ownerId = GetOwnerId()
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken")
  const [doctorComment, setDoctorComment] = useState("")

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/pets/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

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

    fetchPetDetails();
    getDoctorComment(id)
  }, [id, accessToken])

  if (!pet) {
    return <p style={{color: "red"}}>Error. Please log in.</p>
  }

  const returnToPets = () => {
    navigate("/pets")
  }

  const handleDoctorCommentChange = (e) => {
    const commentValue = e.target.value
    setDoctorComment(commentValue)
    localStorage.setItem(`doctorComments/${id}`, commentValue)
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
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={doctorComment} onChange={handleDoctorCommentChange}></textarea>
                  <br/>
                  <label>Update {pet.name}'s status:</label>
                  <UpdatePet petId={id} petStatus={pet.status}/>
                </div>
              )}
            </div>
          </div>
        <Row>
          <ListPetVisits petId={id} petName={pet.name} petStatus={pet.status}/>
        </Row>
        <Button id='GoBackButton' onClick={returnToPets}>Return to Pets</Button>
      </Container>
    ) : (
      <div>
        <p style={{color: "red"}}>Error. Please log in.</p>
      </div>
    )}
    </div>
  )
}

export default PetDetails;
