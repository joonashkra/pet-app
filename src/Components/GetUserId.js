import { useState, useEffect } from 'react';

export function GetUserId(accessToken) {
  const [userId, setUserId] = useState(0);
  
  useEffect(() => {
    if (!accessToken) {
      return;
    }

    fetch('http://localhost:4000/pets', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        return response.json();
      })
      .then((petData) => {
        const ownerIds = [...new Set(petData.map((pet) => pet.ownerId))];
        setUserId(ownerIds.length === 1 ? ownerIds[0] : 0);
      })
      .catch((error) => console.error('Error fetching pets:', error));

  }, [accessToken]);

  return userId;
}
