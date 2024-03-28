import React from 'react'
import CrudForm from './CrudForm';
import CrudRowTable from './CrudRowTable';

const members = [
    {
        id_member: 10,
        name: "Miguel",
        lastName: "Aux",
        email: "danielaa@example",
        phone: "6473829",
        company: "compania D"
    },
    {
        id_member: 9,
        name: "Marcela",
        lastName: "ortega",
        email: "danielaa@example",
        phone: "6473829",
        company: "compania D"
    },
    {
        id_member: 11,
        name: "Andres",
        lastName: "Parra",
        email: "hernandopanto85@gmail.com",
        phone: "6473829",
        company: "compania A"
    },
    {
        id_member: 12,
        name: "Nombre del usuario",
        lastName: "Apellido del usuario",
        email: "correo@example.com",
        phone: "123-456-7890",
        company: "Nombre de la empresa"
    },
    {
        id_member: 13,
        name: "nixon bellaka",
        lastName: "Apellido del usuario",
        email: "nixvill99@gmail.com",
        phone: "123-456-7890",
        company: "Nombre de la empresa"
    },
    {
        id_member: 14,
        name: "Andres",
        lastName: "Pantoja",
        email: "Andres@juju.com",
        phone: "3014819401",
        company: "JUJU"
    }
];
const CrudApp = () => {
  return (
    <div>CrudApp con react
     <CrudForm />
    <CrudRowTable members={members}></CrudRowTable>

    </div>
    

  )
}

export default CrudApp