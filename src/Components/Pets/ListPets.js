import { Col, Row } from 'react-bootstrap';
import LastVisit from '../Visits/LastVisit';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePet from './CreatePet';

export default function ListPets(props) {
  const accessToken = props.accessToken
  const [pets, setPets] = useState([])
  const [visits, setVisits] = useState([])
  const navigate = useNavigate()
  const userId = props.userId
  const [showOnlyAlive, setShowOnlyAlive] = useState(true)
  const [isChecked, setIsChecked] = useState(true)
  
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://localhost:4000/pets/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
        const petsData = await response.json()
        setPets(petsData)
      } 
      catch (error) {
        console.error('Error:', error)
      }
    }
    fetchPets()
  }, [accessToken])

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch('http://localhost:4000/visits', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
        const visitsData = await response.json();
        setVisits(visitsData);
      } 
      catch (error) {
        console.error('Error:', error);
      }
    };
    fetchVisits();
  }, [accessToken]);

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
    setIsChecked(!isChecked)
  }

  return (
      <Row className='PetsList'>
        <Col>
          <div className="card">
            <h4 className="card-header">Pets</h4>
            <div className="card-body" style={{overflowY: "auto"}}>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" checked={isChecked} onChange={handleCheckboxChange} data-testid="filter-checkbox"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Show Only Alive
                </label>
              </div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Last Visit</th>
                  </tr>
                </thead>
                <tbody data-testid="pet-tbody">
                {filteredPets
                    .sort((a, b) => a.id - b.id) //Sort in ascending order by PetId
                    .map((pet) => (
                      <tr key={pet.id} onClick={() => getPetDetails(pet.id)} style={{ cursor: 'pointer' }} data-testid="pet-tr">
                        <td>{pet.id}</td>
                        <td>{pet.name}</td>
                        <td>{(pet.petType).toUpperCase()}</td>
                        <td>{(pet.status).toUpperCase()}</td>
                        <td>
                          <LastVisit visits={visits} petId={pet.id} accessToken={accessToken}/>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
        {userId > 0 &&
          <Col className='createPetContainer'>
            <CreatePet updatePetList={updatePetList} userId={userId} accessToken={accessToken}/>
          </Col>
        }
      </Row>
  )
}