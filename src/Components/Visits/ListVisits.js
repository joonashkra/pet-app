import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

function ListVisits(props) {
  const accessToken = props.accessToken
  const [visits, setVisits] = useState([])
  const [showUpcoming, setShowUpcoming] = useState(true)

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
      } 
      catch (error) {
        console.error('Error fetching visits:', error)
      }
    }
    fetchData()
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

  return (
    <Container className='VisitsList'>
      <Row>
        <Col>
          <div className="card">
            <h4 className="card-header">Visits</h4>
            <div className="card-body">
              <select value={showUpcoming ? 'upcoming' : 'past'} onChange={toggleVisitsList} className="form-select form-select-sm" aria-label="Small select example">
                <option value="upcoming">Upcoming Visits</option>
                <option value="past">Past Visits</option>
              </select>
              <Table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Pet ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisits.map((visit) => (
                    <tr data-testid="visit-tr" key={visit.id}>
                      <td>{visit.petId}</td>
                      <td>{visit.date}</td>
                      <td>{visit.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ListVisits;

