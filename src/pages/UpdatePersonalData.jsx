import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col, Spinner } from 'react-bootstrap';
import useGetCollectionQuery from '../hooks/useGetCollectionQuery';
import useUpdateDocument from '../hooks/useUpdateDocument';
import { useAuth } from '../context/AuthContext';

const UpdatePersonalData = () => {
  
  const { currentUser: { email: EMAIL_USER} } = useAuth();
  const [user, loadingUser] = useGetCollectionQuery(
    "User",
    ["email", "==", EMAIL_USER]
    );
  const [updateDocument] = useUpdateDocument()
  const [newUserData, setNewUserData] = useState({})
  const [error, setError] = useState();
  const [loading, setLoding] = useState(false)

  const semestres = [
    "Primero", 
    "Segundo",
    "Tercero",
    "Cuarto",
    "Quinto",
    "Sexto",
    "Septimo",
    "Octavo",
    "Noveno",
    "Decimo"
  ];

  useEffect(() => {
    if(user) {
      setNewUserData(user[0]);
    }
  }, [user])

  const handleInputChange = (e) => {
    const { target: { value, name}} = e
    setNewUserData(newUserData => ({
      ...newUserData,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    const USER_ID = newUserData.id
    console.log(USER_ID)
    updateDocument("User", USER_ID, newUserData)
  }

  if(loadingUser) {  
    return (
      <div className="container d-flex justify-content-center pt-5">
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <div className="d-flex justify-content-center p-3">
      <Card style={{padding: "30px", maxWidth: "600px", width: "100%"}}>
        <Card.Title className="fs-4 mb-4">Actualizar datos personales</Card.Title>
        <Form>
          <Row>
            <Col>
              <Form.Group style={{marginBottom: "10px"}}>
                <Form.Label>Nombre(s)</Form.Label>
                <Form.Control
                  value={newUserData.name}
                  name="name"
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  value={newUserData.lastName}
                  name="lastName"
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Calle</Form.Label>
            <Form.Control
              value={newUserData.street}
              name="street"
              type="address"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Numero</Form.Label>
            <Form.Control
              value={newUserData.number}
              name="number"
              type="text"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Colonia</Form.Label>
            <Form.Control
              value={newUserData.colonia}
              name="colonia"
              type="text"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              value={newUserData.city}
              name="city"
              type="text"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              value={newUserData.phone}
              name="phone"
              type="phone"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Semestre</Form.Label>
          </Form.Group>
            <select
              value={newUserData.semestre}
              name="semestre"
              onChange={(e) => handleInputChange(e)}
              style={{
                width: "100%",
                height: "38px"
              }}
            >
              {semestres.map(semestre => (
                <option key={semestre} value={`${semestre}`}>{`${semestre}`}</option>
              ))}
            </select>

          {error &&
            <Alert variant="danger" style={{marginTop: "10px"}}>
              {error}
            </Alert>
          }

          <Form.Group className="mt-3">
            <Button disabled={loading} variant="primary" type="button" onClick={handleSubmit}>
              {loading ? "Cargando..." : "Guardar"}
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </div>
  )
}

export default UpdatePersonalData
