import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import useSetDocument from '../hooks/useSetDocument';
import Swal from 'sweetalert2'


const AddMateria = () => {

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

  const initialState = {
    name: "",
    salon: "",
    docente: "", 
    horaInit: 0,
    horaFinish: 0, 
    semestre: "Seleccionar una opcion"
  }

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [setMateria, loadingSetMateria] = useSetDocument()
  const [materiaInfo, setMateriaInfo] = useState(initialState)

  const handleSubmit = async () => {
    setLoading(true)
    setError()
    try {
      // await login(userData.email, userData.password)
      await setMateria("Materias", materiaInfo)
      Toast.fire({
        icon: 'success',
        title: 'Materia agregada correctamente'
      });
      setMateriaInfo(initialState)
      // history.push("/")
    } catch (err) {
      setError("Ha ocurrido un error un agregar la materia")
    }
    setLoading(false)
  }

  const handleInputChange = (e) => {
    const { target: {value, name}} = e;
    setMateriaInfo(materiaInfo => (
      {
        ...materiaInfo,
        [name]: value
      }
    ))
    // console.log({name, value})
  }

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
    <Card style={{padding: "30px", maxWidth: "500px", width: "100%"}}>
      <Card.Title className="fs-3 mb-4">Agregar materia</Card.Title>
      <Form>

        {error &&
          <Alert variant="danger" style={{marginTop: "10px"}}>
            {error}
          </Alert>
        }

        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            name="name"
            type="text"
            // placeholder="ejemplo@gmail.com"
            value={materiaInfo.name}
            onChange={(e) => handleInputChange(e)}
            />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Aula</Form.Label>
          <Form.Control
            name="salon"
            type="text"
            value={materiaInfo.salon}
            onChange={(e) => handleInputChange(e)}
            />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Docente</Form.Label>
          <Form.Control
            name="docente"
            type="text"
            value={materiaInfo.docente}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Hora de inicio de la clase</Form.Label>
          <Form.Control
            name="horaInit"
            type="text"
            value={materiaInfo.horaInit}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Hora de finalización</Form.Label>
          <Form.Control
            name="horaFinish"
            type="text"
            value={materiaInfo.horaFinish}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Semestre</Form.Label>
          <select
            name="semestre"
            onChange={e => handleInputChange(e)}
            style={{
              width: "100%",
              height: "38px"
            }}
            value={materiaInfo.semestre}
          >
            {/* <option value="">Seleccione una opción</option> */}
            <option key={"Seleccionar una opcion"} value={`Seleccionar una opcion`}>{`Seleccionar una opcion`}</option>
            {semestres.map(semestre => (
              <option key={semestre} value={`${semestre}`}>{`${semestre}`}</option>
            ))}
          </select>
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
            {loading ? "Cargando..." : "Agregar"}
          </Button>
        </Form.Group>
        
      </Form>
    </Card>
  </div>
  )
}

export default AddMateria
