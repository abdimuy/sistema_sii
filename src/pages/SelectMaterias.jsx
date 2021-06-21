import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import InputMaterias from '../components/InputMaterias';

const SelectMaterias = () => {

  const [error, setError] = useState();

  return (
    <div className="d-flex justify-content-center p-3">
    <Card style={{padding: "30px", maxWidth: "1000px", width: "100%"}}>
      <Card.Title className="fs-3 mb-4">Seleccionar materias</Card.Title>
      <Form>

        {error &&
          <Alert variant="danger" style={{marginTop: "10px"}}>
            {error}
          </Alert>
        }

        <Form.Group className="mb-3">
          <Form.Label>Selecciona sus materias</Form.Label>
          <InputMaterias />
        </Form.Group>
      </Form>
    </Card>
  </div>
  )
}

export default SelectMaterias
