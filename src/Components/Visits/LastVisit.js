import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LastVisit({ petId }) {
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('accessToken')
  const [visits, setVisits] = useState([])
  const [lastVisit, setLastVisit] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accessToken) {
          const response = await fetch('http://localhost:4000/visits', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            setVisits(data)
          } 
          else {
            console.error('Failed to fetch visits:', response.statusText)
          }
        } 
        else {
          navigate('/')
        }
      } 
      catch (error) {
        console.error('Error fetching visits:', error)
      }
    }

    fetchData()
  }, [accessToken, navigate])

  useEffect(() => {
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
  }, [visits, petId])

  return (
    <p>
      {lastVisit ? lastVisit.date : 'No past visits'}
    </p>
  )
}

export default LastVisit;