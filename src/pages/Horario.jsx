import React, { useState, useEffect } from 'react';
import useGetCollectionQuery from '../hooks/useGetCollectionQuery';
import { Card, Spinner } from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';

const Horario = () => {

  const {currentUser} = useAuth();
  const [infoUser, loadingInfoUser] = useGetCollectionQuery("User", ["email", "==", currentUser.email])[0]
  console.log(loadingInfoUser)

  return (
    <div className="d-flex justify-content-center p-3 flex-column">
      <h1>Horario</h1>
    <>
      {infoUser ?
      <>
        <Card style={{flexDirection: "row", flexWrap: "wrap"}}>
          {infoUser.materias.map(materia => (
            <Card style={{ width: '18rem', marginRight: "5px", marginBottom: "10px", marginTop: "10px" }} key={materia.id}>
              <Card.Body>
                <Card.Title>{materia.name}</Card.Title>
                <Card.Text>
                  {materia.docente}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">{`${materia.horaInit}:00 - ${materia.horaFinish}:00`}</Card.Footer>
            </Card>
          ))}
        </Card>
      </>
        : <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
      }
    </>
    </div>
  )
}

export default Horario
