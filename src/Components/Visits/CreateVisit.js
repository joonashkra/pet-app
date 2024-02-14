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
  const [errorMessage, setErrorMessage] = useState("")
  const accessToken = props.accessToken

  const handleComment = (e) => {
    setComment(e.target.value)
  }

  const addNewVisit = async (e) => {
    e.preventDefault()

    if (visitDate < new Date()) {
      setErrorMessage("Visit must be for a future date.")
      return
    }
  
    try {
      const nextDay = new Date(visitDate);
      const newVisit = {
        date: nextDay.toISOString().substring(0, 10),
        petId: parseInt(petId, 10),
        comment: comment,
      }
  
      const getVisitsRepsonse = await fetch(`http://localhost:4000/visits`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const visits = await getVisitsRepsonse.json()

      const doesVisitExist = visits.some(
        (visit) =>
          visit.date === newVisit.date && visit.petId === newVisit.petId
      )

      if (doesVisitExist) {
        setErrorMessage("A visit is already reserved for this pet on this date. Please choose a different date.")
        return
      }

      try {
        const postVisitResponse = await fetch("http://localhost:4000/visits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newVisit),
        })
        const responseData = await postVisitResponse.json()
        window.alert("New Visit Created.")
        props.addVisit(responseData.visit)
        setVisitDate(new Date())
        setComment("")
        setErrorMessage("")
      } 
      catch (error) {
        console.error("Error:", error)
      }
    } 
    catch (error) {
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