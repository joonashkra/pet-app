import React, { useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

export default function CreatePet(props) {
  const navigate = useNavigate()
  const [petName, setPetName] = useState("")
  const [petType, setPetType] = useState("")
  const [petBirthDate, setPetBirthDate] = useState(new Date())
  const accessToken = props.accessToken
  const updatePetList = props.updatePetList
  const userId = props.userId
  const [errorMessage, setErrorMessage] = useState("")

  const offsetMilliseconds = petBirthDate.getTimezoneOffset() * 60000;
  const dob = new Date(petBirthDate.getTime() - offsetMilliseconds).toISOString().substring(0, 10);

  const newPet = {
    name: petName,
    petType: petType,
    status: "alive",
    dob: dob,
    ownerId: userId
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
          window.alert("Pet added succesfully.");
          setPetType("")
          setPetName("")
          setPetBirthDate(new Date())
          navigate(`/pets/${responseData.pet.id}`)
        }
        catch (error) {
          console.error('Error:', error)
        }
      }
      else {
        e.preventDefault()
        if(petName === "" || petType === "") {
          triggerErrorMessage("Pet must have name and type.")
        }
        else {
          triggerErrorMessage("Date of Birth cannot be a future date.")
        }
      }
  }

  const handlePetType = (e) => {
    setPetType(e.target.value);
  }

  const handlePetName = (e) => {
    setPetName(e.target.value);
  }

  const triggerErrorMessage = (message) => {
    setErrorMessage(<p style={{color: "red", marginTop: "12px", marginBottom: "0"}} data-testid="error-msg">{message}</p>)
  }

  return (
    <div className='card'>
    <h4 className='card-header'>Add new pet</h4>
      <div className='card-body'>
        <Form onSubmit={addNewPet} data-testid="create-pet-form">
            <Form.Label>Type</Form.Label>
              <Form.Group>
                <Form.Control
                  type="petType"
                  placeholder="Enter pet type..."
                  value={petType}
                  onChange={handlePetType}
                  maxLength="10"
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
                  maxLength="10"
                />
              </Form.Group>
              <br/>
              <Form.Label htmlFor="petBirthDate">Date of Birth</Form.Label>
              <Form.Group>
                <DatePicker selected={petBirthDate} onChange={(date) => setPetBirthDate(date)} id="petBirthDate"/>
              </Form.Group>
              <br/>
              <Button type="submit" id="CreatePetButton" data-testid="create-pet-btn">
                  Add Pet
              </Button>
              {errorMessage ? errorMessage : null}
        </Form>
      </div>
    </div>
  )
}