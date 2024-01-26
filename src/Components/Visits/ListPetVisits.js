import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CreateVisit from './CreateVisit';
import { GetOwnerId } from '../GetOwnerId';



function ListPetVisits(props) {
    const [visits, setVisits] = useState([])
    const accessToken = localStorage.getItem('accessToken')
    const navigate = useNavigate()
    const [showUpcoming, setShowUpcoming] = useState(true)
    const ownerId = GetOwnerId()
    const petId = Number(props.petId)
    const petStatus = props.petStatus
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (accessToken) {
            const response = await fetch('http://localhost:4000/visits', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
  
            if (response.ok) {
              const data = await response.json()
              setVisits(data)
            } else {
              console.error('Failed to fetch visits:', response.statusText)
            }
          } else {
            navigate('/')
          }
        } catch (error) {
          console.error('Error fetching visits:', error)
        }
      };
  
      fetchData();
    }, [accessToken, navigate])
  
    // Filter upcoming visits based on the current date and sort them in chronological order
    const filteredVisits = !showUpcoming
    ? visits
        .filter((visit) => new Date(visit.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : visits
        .filter((visit) => new Date(visit.date) < new Date())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
    const toggleVisitsList = () => {
      setShowUpcoming(!showUpcoming)
    }

    const addVisit = (newVisit) => {
      setVisits((prevVisits) => [...prevVisits, newVisit]);
    }

    return (
      <Container>
          <div className='card'>
            <h4 className='card-header'>Visits</h4>
            <div className='card-body'>
              <select value={showUpcoming ? 'past' : 'upcoming'} onChange={toggleVisitsList} className="form-select form-select-sm" aria-label="Small select example">
                <option value="past">Past Visits</option>
                <option value="upcoming">Upcoming Visits</option>
              </select>
              <Table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Comment</th>
                  </tr>
                </thead>
                <tbody>
                {petId &&
                  filteredVisits
                      .filter((visit) => visit.petId === petId)
                      .map((visit) => (
                      <tr key={visit.id}>
                          <td>{visit.date}</td>
                          <td>{visit.comment}</td>
                      </tr>
                      ))}
                  </tbody>
              </Table>
              {petStatus === "alive" && (
              <div>
                  <hr/>
                  <CreateVisit addVisit={addVisit} ownerId={ownerId} petId={props.petId}/>
              </div>
              )}
            </div>
          </div>
      </Container>
    );
}

export default ListPetVisits