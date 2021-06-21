import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useSetDocument from '../hooks/useSetDocument';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2'

const Register = () => {

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

  const initialStateUser = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    street: "",
    number: "",
    colonia: "",
    city: "",
    telefono: "",
    role: "",
    materias: []
  }

  const [setDocument, loadingSetDocument] = useSetDocument();
  const history = useHistory();
  const { signup } = useAuth();

  const [userData, setUserData] = useState(initialStateUser);
  const [error, setError] = useState();
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { target: { name, value }} = e;
    setUserData(userData => (
      {
        ...userData,
        [name]: value
      }
    ))
  }

  const handleSubmit =async (e) => {
    setLoading(true)
    console.log(e.currentTarget)
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      console.log('Es invalido')
      e.preventDefault();
      e.stopPropagation();
      // return null
    }

    if(form.checkValidity() === true) {
      e.preventDefault();
      try {
        await signup(userData.email, userData.password)
        await setDocument("User", userData)
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
        history.push("/login")
      } catch (err) {
        setError("Error al crear el usuario")
      }
    }

    setLoading(false)
    setValidated(true);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  return (
    <div className="d-flex justify-content-center p-3">
      <Card style={{padding: "30px", maxWidth: "600px", width: "100%"}}>
        <Card.Title className="fs-2 mb-5">Registrarse</Card.Title>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group style={{marginBottom: "10px"}}>
                <Form.Label>Nombre(s)</Form.Label>
                <Form.Control
                  required
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
                  required
                  name="lastName"
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              required
              name="email"
              type="email"
              placeholder="ejemplo@gmail.com"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              required
              name="password"
              type="password"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          
          <NavDropdown.Divider className="mt-4 mb-4"/>

          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Calle</Form.Label>
            <Form.Control
              required
              name="street"
              type="address"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Numero</Form.Label>
            <Form.Control
              required
              name="number"
              type="number"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Colonia</Form.Label>
            <Form.Control
              required
              name="colonia"
              type="text"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              required
              name="city"
              type="text"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              required
              name="phone"
              type="phone"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
          <Form.Group style={{marginBottom: "10px"}}>
            <Form.Label>Semestre</Form.Label>
          </Form.Group>
          <select
            name="semestre"
            onChange={e => handleInputChange(e)}
            style={{
              width: "100%",
              height: "38px"
            }}
          >
            {/* <option value="">Seleccione una opción</option> */}
            {semestres.map(semestre => (
              <option key={semestre} value={`${semestre}`}>{`${semestre}`}</option>
            ))}
          </select>

          {error &&
            <Alert variant="danger">{error}</Alert>
          }

          <Form.Group className="mt-3">
            <Button
              disabled={loading}
              variant="primary"
              type="submit"
              // onClick={handleSubmit}
              // onSubmit={handleSubmit}
              style={{
                width: "100%"
              }}
            >
              {loadingSetDocument ? "Cargando..." : "Registrarse"}
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </div>
  )
}

export default Register;