import React from 'react'

const CrudRowTable = ({ members }) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Empresa</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Email</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {members.map((el) => (
            <tr key={el.id_member}>
              <td>{el.name}</td>
              <td>{el.lastName}</td>
              <td>{el.company}</td>
              <td>{el.phone}</td>
              <td>{el.email}</td>
              <td>
                <button className="btn btn-primary">Editar</button>
                <button className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  

export default CrudRowTable