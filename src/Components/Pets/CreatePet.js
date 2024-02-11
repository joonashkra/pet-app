import React, { useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

function CreatePet(props) {
  const navigate = useNavigate()
  const [petName, setPetName] = useState("")
  const [petType, setPetType] = useState("")
  const [petBirthDate, setPetBirthDate] = useState(new Date())
  const [errorMessage, setErrorMessage] = useState("")
  const accessToken = localStorage.getItem('accessToken')
  const updatePetList = props.updatePetList

  const newPet = {
    name: petName,
    petType: petType,
    status: "alive",
    dob: petBirthDate.toISOString().substring(0, 10),
    ownerId: props.ownerId
  }

  const handlePetType = (e) => {
    setPetType(e.target.value);
  }

  const handlePetName = (e) => {
    setPetName(e.target.value);
  }

  const showErrorMessage = () => {
    setErrorMessage("Please enter valid data.")
  }

  const addNewPet = async (e) => {
    if(petName && petType && petBirthDate <= new Date()) {
        e.preventDefault()
        try {
          const response = await fetch('http://localhost:4000/pets', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(newPet),
          })

          const responseData = await response.json()
          updatePetList(newPet)
          if(window.confirm("You will be navigated to view the details of newly-created pet.")) {
            navigate(`/pets/${responseData.pet.id}`)
          }
          setPetType("")
          setPetName("")
          setPetBirthDate(new Date())
        }
        catch (error) {
          console.error('Error:', error)
        }
      }
      else {
        e.preventDefault()
        showErrorMessage()
      }
    }
  
  return (
    <div className='card'>
    <h4 className='card-header'>Add new pet</h4>
      <div className='card-body'>
        <Form onSubmit={addNewPet}>
            <Form.Label>Type</Form.Label>
              <Form.Group>
                <Form.Control
                  type="petType"
                  placeholder="Enter pet type..."
                  value={petType}
                  onChange={handlePetType}
                />
              </Form.Group>
              <br/>
            <Form.Label>Name</Form.Label>
              <Form.Group>
                <Form.Control
                  type="petName"
                  placeholder="Enter name..."
                  value={petName}
                  onChange={handlePetName}
                />
              </Form.Group>
              <br/>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Group>
                <DatePicker selected={petBirthDate} onChange={(date) => setPetBirthDate(date)} />
              </Form.Group>
              <br/>
          <Button type="submit" id="CreatePetButton">Add Pet</Button>
          <p style={{color: "red"}}>{errorMessage}</p>
        </Form>
      </div>
    </div>
  )
}

export default CreatePet