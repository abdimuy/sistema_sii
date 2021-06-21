import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const Login = () => {

  const { login } = useAuth();
  const history = useHistory();

  const initialState = {
    email: "",
    password: ""
  }

  const [userData, setUserData] = useState(initialState);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const handleInputChange = (e) => {
    const { target: {value, name}} = e;
    setUserData(setUserData => (
      {
        ...setUserData,
        [name]: value
      }
    ))
    console.log({name, value})
  }
  
  const handleSubmit = async () => {
    setLoading(true)
    setError()
    try {
      await login(userData.email, userData.password)
      history.push("/")
    } catch (err) {
      setError("Compruebe que el correo y la contraseña sean correctos")
    }
    setLoading(false)
  }
  
  return (
    <div className="d-flex justify-content-center p-3">
      <Card style={{padding: "30px", maxWidth: "500px", width: "100%"}}>
        <Card.Title className="fs-3 mb-4">Iniciar sesión</Card.Title>
        <Form>

          {error &&
            <Alert variant="danger" style={{marginTop: "10px"}}>
              {error}
            </Alert>
          }

          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="ejemplo@gmail.com"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              name="password"
              type="password"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Button
              disabled={loading}
              variant="primary"
              type="button"
              // size="sm"
              style={{
                width: "100%"
              }}
              // block
              onClick={handleSubmit}
            >
              {loading ? "Cargando..." : "Ingresar"}
            </Button>
          </Form.Group>
          
        </Form>
        <LinkContainer to="/register">
          <Card.Link className="d-flex justify-content-center mt-2">Registrarse</Card.Link>
        </LinkContainer>
      </Card>
    </div>
  )
}

export default Login
