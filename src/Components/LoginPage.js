import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './LoginPage.css'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    sessionStorage.removeItem('accessToken')
  })

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()
    if(email !== "" && password !== "") {
      const tokenResponse = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      try {
        if (tokenResponse.status === 200) {
          const data = await tokenResponse.json()
          const accessToken = data.access_token
          sessionStorage.setItem('accessToken', accessToken)
          navigate('/pets', { state: { accessToken } })
        }
        else {
          setErrorMessage("Wrong email or password.")
        }
      }
      catch (error) {
        console.log("Failed to fetch data.")
      }
    }
  }

  return (
    <Container className='LoginPage'>
        <div className="card">
          <h4 className="card-header">Pet Clinic</h4>
          <div className="card-body">
            <form onSubmit={handleLogin} className="LoginForm">
              <label className='form-label' htmlFor="email">Email Address</label>
              <input className="form-control" type="email" id="email" placeholder="Enter email..." value={email} onChange={handleEmailChange}/>
              <label className='form-label' htmlFor="password">Password</label>
              <input className="form-control" type="password" id="password" placeholder="Enter password..." value={password} onChange={handlePasswordChange}/>
              {errorMessage && <p style={{color: 'red' }}>{errorMessage}</p>}
              <button className="btn btn-primary" type="submit" id="LogInButton">Login</button>
            </form>
          </div>
        </div>
    </Container>
  )
}