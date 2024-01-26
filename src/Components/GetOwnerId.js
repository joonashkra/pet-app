import { useState, useEffect } from 'react';

export function GetOwnerId() {
  const accessToken = localStorage.getItem('accessToken')
  const [pets, setPets] = useState([])

  useEffect(() => {
    if (accessToken) {
      fetch('http://localhost:4000/pets', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((petData) => setPets(petData))
        .catch((error) => console.error('Error fetching pets:', error))
    } else {
      console.log("401 Forbidden")
    }
  }, [accessToken])

  const [ownerId, setOwnerId] = useState(0)

  useEffect(() => {
    const calculateOwnerId = () => {
      const ownerIds = [...new Set(pets.map((pet) => pet.ownerId))]
      setOwnerId(ownerIds.length === 1 ? ownerIds[0] : 0)
    }

    calculateOwnerId()
  }, [pets])

  return ownerId
}
