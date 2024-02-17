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
    const fetchOwnerName = async () => {
      if(userId > 0) return
      try {
        if (!pet) return; 
        const response = await fetch('http://localhost:4000/users', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const ownerData = await response.json()
        const owner = ownerData.find(owner => owner.id === pet.ownerId)
        setOwnerName(owner.name)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchOwnerName()
  }, [accessToken, pet, userId]);

  const returnToPets = () => {
    navigate("/pets")
  }

  const handleDoctorCommentChange = (e) => {
    const commentValue = e.target.value
    setDoctorComment(commentValue)
    localStorage.setItem(`doctorComments/${id}`, commentValue)
  }

  if (!pet || error) {
    return <div>{error}</div>
  }

  return (
      <Container className='PetDetails'>
          <div className='card'>
            <h4 className='card-header'>{pet.name}'s Details</h4>
            <div className='card-body'>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Type</th>
                      <th scope="col">Status</th>
                      <th scope="col">D.O.B</th>
                      {userId === 0 && <th scope="col">Owner</th>}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{pet.id}</td>
                      <td>{pet.petType.toUpperCase()}</td>
                      <td>{pet.status.toUpperCase()}</td>
                      <td>{pet.dob}</td>
                      {userId === 0 && <td>{ownerName}</td>}
                    </tr>
                  </tbody>
                </table>
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