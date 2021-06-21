import React from 'react';
import { Navbar, NavDropdown, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  
  const { logout } = useAuth();

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="Container">
      <div className="row">
        <Navbar bg="light" variant="light" expand="lg">
          <Navbar.Brand>Instituto Tecnológico Tehuacán</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" style={{justifyContent: 'space-between'}}>
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link >Inicio</Nav.Link>
              </LinkContainer>
              {/* <LinkContainer to="/updatepersonaldata">
                <Nav.Link>Información personal</Nav.Link>
              </LinkContainer> */}
              <NavDropdown title="Información personal" id="navbarScrollingDropdown">
                <LinkContainer to="/updatepersonaldata">
                  <NavDropdown.Item>Actualizar datos personales</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/updateuserdata">
                  <NavDropdown.Item>Actualizar datos de usuario</NavDropdown.Item>
                </LinkContainer>
                {/* <NavDropdown.Divider /> */}
                {/* <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item> */}
              </NavDropdown>
              <NavDropdown title="Inscripciones" id="navbarScrollingDropdown">
                <LinkContainer to="/SelectMaterias">
                  <NavDropdown.Item>Seleccionar materias</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/Horario">
                  <NavDropdown.Item>Ver horario</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown title="Opciones de admin" id="navbarScrollingDropdown">
                <LinkContainer to="/AddMateria">
                  <NavDropdown.Item>Agregar materias</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/Users">
                  <NavDropdown.Item>Ver usuarios</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <Button type="button" variant="outline-danger" onClick={handleLogout}>Cerrar sesión</Button>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="row">
        {children}
      </div>
    </div>
  )
}

export default Layout
