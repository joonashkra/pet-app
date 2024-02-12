import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './LoginPage.css'

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()

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
        setErrorMessage("Wrong username or password.")
      }
    }
    catch (error) {
      console.log("Failed to fetch data.")
    }
  }

  return (
    <Container className='LoginPage'>
        <div className="card">
          <h4 className="card-header">Pet Clinic</h4>
          <div className="card-body">
            <Form onSubmit={handleLogin} className="LoginForm">
              <Form.Label>Email Address</Form.Label>
                <Form.Group controlId='formEmail'>
                  <Form.Control
                    type="email"
                    placeholder="Enter email..."
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Form.Group>
              <Form.Label>Password</Form.Label>
                <Form.Group controlId='formPassword'>
                  <Form.Control
                    type="password"
                    placeholder="Enter password..."
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
              {errorMessage && <p style={{color: 'red' }}>{errorMessage}</p>}
              <Button type="submit" id="LogInButton">Login</Button>
            </Form>
          </div>
        </div>
    </Container>
  )
}

export default LoginPage