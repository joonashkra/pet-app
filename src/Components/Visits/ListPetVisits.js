import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import CreateVisit from './CreateVisit';

export default function ListPetVisits(props) {
    const [visits, setVisits] = useState([])
    const accessToken = props.accessToken
    const [showPast, setShowPast] = useState(true)
    const petId = Number(props.petId)
    const petStatus = props.petStatus
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/visits', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          })
          const data = await response.json()
          setVisits(data)

        } catch (error) {
          console.error('Error fetching visits:', error)
        }
      }
      fetchData();
    }, [accessToken])
  
    // Filter upcoming visits based on the current date and sort them in chronological order
    const filteredVisits = !showPast
    ? visits
        .filter((visit) => new Date(visit.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : visits
        .filter((visit) => new Date(visit.date) < new Date())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
    const toggleVisitsList = () => {
      setShowPast(!showPast)
    }

    const addVisit = (newVisit) => {
      setVisits((prevVisits) => [...prevVisits, newVisit]);
    }

    return (
      <Col>
        <div className='card'>
          <h4 className='card-header'>Visits</h4>
          <div className='card-body'>
            <form data-testid="sort-select">
              <select value={showPast ? 'past' : 'upcoming'} onChange={toggleVisitsList} className="form-select form-select-sm">
                <option value="past">Past Visits</option>
                <option value="upcoming">Upcoming Visits</option>
              </select>
            </form>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Comment</th>
                </tr>
              </thead>
              <tbody data-testid="pet-visits-tbody">
              {petId &&
                filteredVisits
                    .filter((visit) => visit.petId === petId)
                    .map((visit) => (
                    <tr data-testid="pet-visits-tr" key={visit.id}>
                        <td>{visit.date}</td>
                        <td>{visit.comment}</td>
                    </tr>
                    ))}
              </tbody>
            </table>
            {petStatus === "alive" && 
            <div>
                <hr/>
                <CreateVisit addVisit={addVisit} petId={props.petId} accessToken={accessToken} visits={visits}/>
            </div>
            }
          </div>
        </div>
      </Col>
    );
}