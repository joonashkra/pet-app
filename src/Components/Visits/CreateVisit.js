import React, { useState} from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateVisit(props) {

  const petId = props.petId ?? ''

  const [visitDate, setVisitDate] = useState(new Date())
  const [comment, setComment] = useState("")

  const handleComment = (e) => {
    setComment(e.target.value)
  }

  const [errorMessage, setErrorMessage] = useState("")

  const accessToken = localStorage.getItem('accessToken')

  const addNewVisit = async (e) => {
    setErrorMessage("")
    e.preventDefault()
  
    if (visitDate < new Date()) {
      setErrorMessage("Visit must be for a future date.")
      return
    }
  
    try {
      const nextDay = new Date(visitDate);

      // Increment visitDate by one day, sometimes outputs the day before the actual input-given date ?? mabye caused by time zone differences
      /* nextDay.setDate(nextDay.getDate() + 1); */
  
      const newVisit = {
        date: nextDay.toISOString().substring(0, 10),
        petId: parseInt(petId, 10),
        comment: comment,
      }
  
      const visitsResponse = await fetch(`http://localhost:4000/visits`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
  
      if (visitsResponse.ok) {
        const visits = await visitsResponse.json()
  
        const doesVisitExist = visits.some(
          (visit) =>
            visit.date === newVisit.date && visit.petId === newVisit.petId
        )
  
        if (doesVisitExist) {
          setErrorMessage("A visit is already reserved for this pet on this date. Please choose a different date.")
          return
        }
  
        const response = await fetch("http://localhost:4000/visits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newVisit),
        })
  
        if (response.ok) {
          const responseData = await response.json()
          window.alert("New Visit Created.")
          props.addVisit(responseData.visit)
          setVisitDate(new Date())
          setComment("")
        } else {
          console.error(
            "Failed to add visit:",
            response.status,
            response.statusText
          );
          const errorData = await response.json()
          console.error("Error details:", errorData)
        }
      } else {
        console.error(
          "Failed to fetch existing visits:",
          visitsResponse.status,
          visitsResponse.statusText
        )
        const errorData = await visitsResponse.json()
        console.error("Error details:", errorData)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }
  

  return (
    <Container>
    <Form onSubmit={addNewVisit}>
      <Form.Label>New Visit Date</Form.Label>
      <Form.Group>
        <DatePicker selected={visitDate} onChange={(date) => setVisitDate(date)} />
      </Form.Group>
        <br/>
        <Form.Label>Comment</Form.Label>
          <Form.Group>
            <Form.Control
              type="comment"
              placeholder="Enter comment for visit..."
              value={comment}
              onChange={handleComment}
            />
          </Form.Group>
        <p style={{color: "red"}}>{errorMessage}</p>
      <Button type="submit" id="CreateVisitButton">Add Visit</Button>
    </Form>
    </Container>
  )
}

export default CreateVisit