
import React,{useState,useEffect} from 'react'
const initialForm={
        name: "Andres",
        lastName: "Pantoja",
        email: "Andres@juju.com",
        phone: "3014819401",
        company: "JUJU"
}

const CrudForm = () => {
  const[form,setForm]=useState(initialForm) 
  const handleChange= (e)=>{}
  const handleSubmit= (e)=>{}
  const handleReset= (e)=>{}
  return (
    <div>
        <h3>Agregar</h3>
        <form onSubmit={handleSubmit}>
          <input type='text' name='name' placeholder='Nombre' onChange={handleChange} value={form.name}/>
          <input type='text' name='lastName' placeholder='Apellido' onChange={handleChange} value={form.lastName}/>
          <input type='email' name='email' placeholder='correo'/>
          <input type='text' name='company' placeholder='Compañia'  onChange={handleChange} value={form.company}/>
          <input type='submit' value="Enviar"/>
          <input type='reset' value="Limpiar" onClick={handleReset}/>
        </form>
    </div>
  )
}

export default CrudForm