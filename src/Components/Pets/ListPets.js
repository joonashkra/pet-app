import { Container, Col, Row, Table } from 'react-bootstrap';
import LastVisit from '../Visits/LastVisit';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePet from './CreatePet';
import { GetOwnerId } from '../GetOwnerId';

function ListPets(props) {
  const accessToken = props.token
  const [pets, setPets] = useState([])
  const navigate = useNavigate()
  const ownerId = GetOwnerId()
  const [showOnlyAlive, setShowOnlyAlive] = useState(false)
  
  useEffect(() => {
    if (accessToken) {
      fetch('http://localhost:4000/pets', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((petData) => setPets(petData))
        .catch((error) => console.error('Error fetching pets:', error))
    } 
    else {
      navigate('/')
    }
  }, [accessToken, navigate])

  const updatePetList = (newPet) => {
    setPets((petData) => [...petData, newPet])
  }

  const getPetDetails = (petId) => {
    navigate(`/pets/${petId}`)
  }

  const showAlive = () => {
    return pets.filter((pet) => pet.status === 'alive')
  }

  const filteredPets = showOnlyAlive ? showAlive() : pets

  const handleCheckboxChange = () => {
    setShowOnlyAlive(!showOnlyAlive);
  }

  return (
    <Container>
      <Row>
        <Col className='PetsList'>
        <div className="card">
          <h4 className="card-header">Pets</h4>
          <div className="card-body">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={handleCheckboxChange}/>
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Show Only Alive
              </label>
            </div>
            <Table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">Last Visit</th>
                </tr>
              </thead>
              <tbody>
              {filteredPets
                  .sort((a, b) => a.id - b.id) //Sort in ascending order
                  .map((pet) => (
                    <tr key={pet.id} onClick={() => getPetDetails(pet.id)} style={{ cursor: 'pointer' }}>
                      <td>{pet.id}</td>
                      <td>{pet.name}</td>
                      <td>{pet.petType.toUpperCase()}</td>
                      <td>{pet.status.toUpperCase()}</td>
                      <td>
                        <LastVisit petId={pet.id} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
          
        </Col>
        {ownerId === 0 ? (
          <div></div>
        ) : (
          <Col>
            <CreatePet updatePetList={updatePetList} ownerId={ownerId}/>
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default ListPets;