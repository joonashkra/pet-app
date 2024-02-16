import { useState, useEffect } from 'react';

export function GetOwnerId(accessToken) {
  const [ownerId, setOwnerId] = useState(0);

  useEffect(() => {
    if (!accessToken) {
      console.error("401 Forbidden: Access token not provided");
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
        setOwnerId(ownerIds.length === 1 ? ownerIds[0] : 0);
      })
      .catch((error) => console.error('Error fetching pets:', error));

  }, [accessToken]);

  return ownerId;
}
