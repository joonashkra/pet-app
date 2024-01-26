import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'react-datepicker/dist/react-datepicker.css';

function UpdatePet(props) {

  const [newStatus, setNewStatus] = useState("")

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value)
  };

  const [errorMessage, setErrorMessage] = useState("")

  const showErrorMessage = () => {
    setErrorMessage("Please select a value.")
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:4000/pets/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })
  
      if (response.ok) {
        const responseData = await response.json()
        console.log('Pet updated:', responseData)
        const shouldRefresh = window.confirm("Pet status updated succesfully. Do you wish to refresh the page to view the updates immediately?")
        if (shouldRefresh) {
          window.location.reload(true)
        }
      } else {
        console.error('Failed to update pet')
        showErrorMessage()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  };

  return (
    <div>
        <select className="form-select form-select-sm" aria-label="Small select example" value={newStatus} onChange={handleStatusChange}>
            <option value="" hidden={newStatus === ""}>Select new status:</option>
            <option value="alive" disabled={props.status === 'alive'}>ALIVE</option>
            <option value="deceased" disabled={props.status === 'deceased'}>DECEASED</option>
            <option value="missing" disabled={props.status === 'missing'}>MISSING</option>
            <option value="other" disabled={props.status === 'other'}>OTHER</option>
        </select>
            <p style={{color: "red"}}>{errorMessage}</p>
            {newStatus !== ""  && (
                <Button type="button" onClick={handleSave} id="UpdatePetButton">Save Status</Button>
            )}
    </div>
  )
}

export default UpdatePet