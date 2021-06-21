import React, { useState, useEffect } from 'react';
import { Card, Spinner, Button, ListGroup } from 'react-bootstrap'
import useGetCollection from '../hooks/useGetCollection';
import useGetCollectionQuery from '../hooks/useGetCollectionQuery';
import useUpdateDocument from '../hooks/useUpdateDocument';
import {useAuth} from '../context/AuthContext';
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom';

const InputMaterias = () => {

  const [materias, loadingMaterias] = useGetCollection("Materias");
  const {currentUser} = useAuth();
  const [userInfo, loadingUserInfo] = useGetCollectionQuery("User", ["email", "==", currentUser.email])[0]
  // const [infoUser, setInfoUser] = useState()
  const [updateDocument] = useUpdateDocument()
  const [selectedMaterias, setSelectedMaterias] = useState([])
  const [loading, setLoading] = useState(); 

  const history = useHistory();

  const handleSelectMateria = (newMateria) => {
    const findIndexMateria = selectedMaterias.findIndex(materia => materia.id === newMateria.id)
    if(findIndexMateria >= 0) {
      console.log("Materia repetida")
      return null
    }
    setSelectedMaterias(selectedMaterias => (
      [
        ...selectedMaterias,
        newMateria
      ]
    ))
  }

  const handleDeleteMateria = (id) => {
    let materiaIndex = selectedMaterias.findIndex(materia => materia.id === id)
    setSelectedMaterias(materias => {
      let newMaterias = [...materias]
      console.log(materiaIndex)
      newMaterias.splice(materiaIndex, 1)
      return newMaterias
    })
  }

  const handleSubmit = async () => {
    await updateDocument("User", userInfo.id, {
      materias: selectedMaterias
    })
    Toast.fire({
      icon: 'success',
      title: 'Horario cargado correctamente'
    });
    history.push("/")
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

  useEffect(() => {
    if(currentUser) {

    }
  }, [currentUser])

  return (
    <>
    {!loadingMaterias ?
    <>

      <Card style={{flexDirection: "row", flexWrap: "wrap"}}>
        {materias.map(materia => (
          <Card style={{ width: '18rem', marginRight: "5px", marginBottom: "10px", marginTop: "10px" }} key={materia.id}>
            <Card.Body>
              <Card.Title>{materia.name}</Card.Title>
              <Card.Text>
                {materia.docente}
              </Card.Text>
              <Button onClick={() => handleSelectMateria(materia)} variant="primary">Seleccionar materia</Button>
            </Card.Body>
            <Card.Footer className="text-muted">{`${materia.horaInit}:00 - ${materia.horaFinish}:00`}</Card.Footer>
          </Card>
        ))}
      </Card>
      <Card className="container mt-3 mb-3">
        <Card.Subtitle className="fs-4 mb-4 mt-4">Materias seleccionadas</Card.Subtitle>
        {selectedMaterias.map(selectedMateria => (
          <ListGroup horizontal className="my-2" style={{minWidth: "100%"}} key={selectedMateria.id}>
            <ListGroup.Item style={{minWidth: "300px"}}>{selectedMateria.name}</ListGroup.Item>
            <ListGroup.Item>{selectedMateria.docente}</ListGroup.Item>
            <ListGroup.Item>{`${selectedMateria.horaInit}:00 - ${selectedMateria.horaFinish}:00`}</ListGroup.Item>
            <ListGroup.Item>{selectedMateria.salon}</ListGroup.Item>
            <Button onClick={ () => handleDeleteMateria(selectedMateria.id) } variant="danger" className="ml-2">Eliminar</Button>
          </ListGroup>
        ))}
      </Card>
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
          {loading ? "Cargando..." : "Guardar"}
        </Button>
    </>
        : <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
      }
    </>
  )
}

export default InputMaterias
