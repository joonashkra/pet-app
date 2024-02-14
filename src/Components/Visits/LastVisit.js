import React, { useEffect, useState } from 'react';

function LastVisit(props) {
  const accessToken = props.accessToken
  const petId = props.petId
  const [visits, setVisits] = useState([])
  const [lastVisit, setLastVisit] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/visits', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
        const data = await response.json()
        setVisits(data)
      } 
      catch (error) {
        console.error('Error fetching visits:', error)
      }
    }
    fetchData()

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
    getLastVisit()
  }, [accessToken, visits, petId])

  return (
    <p>
      {lastVisit ? lastVisit.date : '-'}
    </p>
  )
}

export default LastVisit;