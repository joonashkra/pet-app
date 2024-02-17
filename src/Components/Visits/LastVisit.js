import React, { useEffect, useState } from 'react';

export default function LastVisit(props) {
  const petId = props.petId
  const visits = props.visits
  const [lastVisit, setLastVisit] = useState(null)

  useEffect(() => {
      const getLastVisit = () => {
        const currentDate = new Date()
        const petVisits = visits.filter((visit) => visit.petId === petId && new Date(visit.date) <= currentDate)
    
        if (petVisits.length > 0) {
          const latestVisit = petVisits.reduce((prev, current) =>
            new Date(prev.date) > new Date(current.date) ? prev : current
          )
          setLastVisit(latestVisit);
        } 
        else {
          setLastVisit(null)
        }
      }
      getLastVisit();
  }, [visits, petId]); 

  return (
    <p>
      {lastVisit ? lastVisit.date : '-'}
    </p>
  )
}