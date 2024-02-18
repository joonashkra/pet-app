import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'react-datepicker/dist/react-datepicker.css';

export default function UpdatePet(props) {

  const [newStatus, setNewStatus] = useState("")
  const petId = props.petId
  const petStatus = props.petStatus
  const accessToken = props.accessToken

  const updatePet = async () => {
    try {
      await fetch(`http://localhost:4000/pets/${petId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })
      window.alert("Pet status updated succesfully.")
      window.location.reload(true)
    } 
    catch (error) {
      console.error('Error:', error)
    }
  }

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value)
  }

  return (
    <div>
      <select className="form-select form-select-sm" data-testid="pet-status-select" value={newStatus} onChange={handleStatusChange}>
        <option value="" hidden={newStatus === ""}>Select new status:</option>
        <option value="alive" disabled={petStatus === 'alive'}>ALIVE</option>
        <option value="deceased" disabled={petStatus === 'deceased'}>DECEASED</option>
        <option value="missing" disabled={petStatus === 'missing'}>MISSING</option>
        <option value="other" disabled={petStatus === 'other'}>OTHER</option>
      </select>
      {newStatus !== ""  && (
        <Button type="button" onClick={updatePet} id="UpdatePetButton">Save New Status</Button>
      )}
    </div>
  )
}