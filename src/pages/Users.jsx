import { Spinner, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import useGetCollection from '../hooks/useGetCollection';

const Users = () => {

  const [users, loadingUsers] = useGetCollection("User");
  console.log(users)
  return (
    <div className="d-flex justify-content-center align-items-center p-3 flex-column">
      <Card style={{flexDirection: "row", flexWrap: "wrap", gap: "10px", padding: "15px", maxWidth: "1000px"}}>
        {users.map(user => (
          <Card style={{ width: '500px' }}>
            <Card.Body>
              <Card.Title>{user.name} {user.lastName}</Card.Title>
              <Card.Text>
                Semestre: {user.email}
              </Card.Text>
              <Card.Text>
                Correo Electrónico: {user.email}
              </Card.Text>
              <Card.Text>
                Dirección: {user.street} {user.colonia} {user.city}
              </Card.Text>
              <Card.Text>
                Teléfono: {user.phone}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Card>
    </div>
  )
}

export default Users
