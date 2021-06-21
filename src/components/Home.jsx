import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Spinner, Card } from 'react-bootstrap';
import useGetCollectionQuery from '../hooks/useGetCollectionQuery';
import { LinkContainer } from 'react-router-bootstrap';

const Home = () => {

  const { currentUser } =  useAuth();
  const [userInfo, userInfoLoading] = useGetCollectionQuery("User", ["email", "==", currentUser.email])[0];
  console.log(userInfo)

  return (
    <>
      {userInfo ? 
        <div className="d-flex justify-content-center align-items-center p-3 flex-column">
          <h1 className="mb-5">Buen día {userInfo.name} {userInfo.lastName}</h1>
          <Card.Title className="mb-4">
            ¿Qué puedes hacer?
          </Card.Title>
          <Card style={{flexDirection: "row", flexWrap: "wrap", gap: "10px", padding: "15px", maxWidth: "1000px"}}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Horario</Card.Title>
                <Card.Text>
                  Pueder ver tus materias seleccionadas
                </Card.Text>
                <LinkContainer to="/Horario">
                  <Card.Link>Ir al horario</Card.Link>
                </LinkContainer>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Actualizar información</Card.Title>
                <Card.Text>
                  Puedes actualizar la información de usuario
                </Card.Text>
                <LinkContainer to="/updatepersonaldata">
                  <Card.Link>Ir a actualizar información</Card.Link>
                </LinkContainer>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Seleccionar materias</Card.Title>
                <Card.Text>
                  Pueder seleccionar las materias del próximo semestre
                </Card.Text>
                <LinkContainer to="/SelectMaterias">
                  <Card.Link>Ir a selección de materias</Card.Link>
                </LinkContainer>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Agregar materias</Card.Title>
                <Card.Text>
                  Pueder agregar nuevas materias para que los alumnos las seleccionen
                </Card.Text>
                <LinkContainer to="/AddMateria">
                  <Card.Link>Ir a agregar materias</Card.Link>
                </LinkContainer>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Lista de usuarios</Card.Title>
                <Card.Text>
                  Puede ver todos los usuarios registrados en el SII
                </Card.Text>
                <LinkContainer to="/Users">
                  <Card.Link>Ir usuarios</Card.Link>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Card>
        </div>
        : <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
      }
    </>
  )
}

export default Home;
