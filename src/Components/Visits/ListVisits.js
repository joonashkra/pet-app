import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

export default function ListVisits(props) {
  const accessToken = props.accessToken
  const [visits, setVisits] = useState([])
  const [showUpcoming, setShowUpcoming] = useState(true)
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch('http://localhost:4000/visits', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
        const data = await response.json()
        setVisits(data)
      } 
      catch (error) {
        console.error('Error fetching visits:', error)
      }
    }
    fetchVisits()

  }, [accessToken])

  useEffect(() => {
    const fetchPets = async () => {
        await fetch('http://localhost:4000/pets', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((petData) => setPets(petData))
          .catch((error) => console.error('Error fetching pets:', error))
    }
    fetchPets()
  }, [accessToken])

  // Filter upcoming visits based on the current date and sort them in chronological order
  const filteredVisits = showUpcoming
  ? visits
      .filter((visit) => new Date(visit.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  : visits
      .filter((visit) => new Date(visit.date) < new Date())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const toggleVisitsList = () => {
    setShowUpcoming(!showUpcoming)
  }

  const getPetNameById = (petId) => {
    if(pets) {
      const pet = pets.find(pet => pet.id === petId);
      return pet ? pet.name : "";
    }
  };

  return (
      <Row className='VisitsList'>
        <Col>
          <div className="card">
            <h4 className="card-header">Visits</h4>
            <div className="card-body" style={{overflowY: "auto"}}>
              <select value={showUpcoming ? 'upcoming' : 'past'} onChange={toggleVisitsList} className="form-select form-select-sm" aria-label="Small select example">
                <option value="upcoming">Upcoming Visits</option>
                <option value="past">Past Visits</option>
              </select>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisits.map((visit) => (
                    <tr data-testid="visit-tr" key={visit.id}>
                      <td>{visit.petId}</td>
                      <td>{getPetNameById(visit.petId)}</td>
                      <td>{visit.date}</td>
                      <td>{visit.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
  )
}

