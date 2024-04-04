import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../funtions';

const ShowMembers = () => {
    const url = 'http://localhost:3000/members';
    const [members, setMembers] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');

    useEffect(() => {
        getMembers();
    }, []);

    const getMembers = async () => {
        const response = await axios.get(url);
        setMembers(response.data);
    }

    const openModal = (op, id, name, lastName, email, phone, company) => {
        setId('');
        setName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setCompany('');
        setOperation(op);
        if (op === 1) {
            setTitle('Registrar Miembro');
        } else if (op === 2) {
            setTitle('Editar Miembro');
            setId(id);
            setName(name);
            setLastName(lastName);
            setEmail(email);
            setPhone(phone);
            setCompany(company);
        }
        window.setTimeout(function () {
            document.getElementById('nombre').focus();
        }, 500);
    }

    const validate = () => {
        if (name.trim() === '') {
            show_alerta('Por favor ingrese el nombre del miembro', 'warning');
        } else if (lastName.trim() === '') {
            show_alerta('Por favor ingrese el apellido del miembro', 'warning');
        } else if (email.trim() === '') {
            show_alerta('Por favor ingrese el correo electrónico del miembro', 'warning');
        } else if (phone.trim() === '') {
            show_alerta('Por favor ingrese el teléfono del miembro', 'warning');
        } else if (company.trim() === '') {
            show_alerta('Por favor ingrese la compañía del miembro', 'warning');
        } else {
            const member = {
                name: name.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                company: company.trim()
            };

            if (operation === 1) {
                sendRequest('POST', member);
            } else {
                member.id_member = id;
                sendRequest('PUT', member);
            }
        }
    }

    const sendRequest = async (method, data) => {
        try {
            const response = await axios({ method: method, url: url, data: data });
            const type = response.data[0];
            const message = response.data[1];
            show_alerta(message, type);
            if (type === 'success') {
                document.getElementById('btnCerrar').click();
                getMembers();
            }
        } catch (error) {
            show_alerta('Error en la solicitud', 'error');
            console.log(error);
        }
    }

    const deleteMember = (id, name, lastName) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Seguro de eliminar al miembro ' + name + ' ' + lastName + '?',
            icon: 'question',
            text: 'Esta acción no se puede deshacer',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                sendRequest('DELETE', { id_member: id });
            } else {
                show_alerta('El miembro NO fue eliminado', 'info');
            }
        });
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalMembers'>
                                <i className='fa-solid fa-circle-plus'></i> Añadir
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr><th>#</th><th>Nombre</th><th>Apellido</th><th>Email</th><th>Teléfono</th><th>Compañía</th><th></th></tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {members.map((member, index) => (
                                        <tr key={member.id_member}>
                                            <td>{index + 1}</td>
                                            <td>{member.name}</td>
                                            <td>{member.lastName}</td>
                                            <td>{member.email}</td>
                                            <td>{member.phone}</td>
                                            <td>{member.company}</td>
                                            <td>
                                                <button onClick={() => openModal(2, member.id_member, member.name, member.lastName, member.email, member.phone, member.company)}
                                                    className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalMembers'>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                &nbsp;
                                                <button onClick={() => deleteMember(member.id_member, member.name, member.lastName)} className='btn btn-danger'>
                                                    <i className='fa-solid fa-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id='modalMembers' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>Nombre</span>
                                <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={name}
                                    onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>Apellido</span>
                                <input type='text' id='apellido' className='form-control' placeholder='Apellido' value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>Email</span>
                                <input type='text' id='email' className='form-control' placeholder='Email' value={email}
                                    onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>Teléfono</span>
                                <input type='text' id='telefono' className='form-control' placeholder='Teléfono' value={phone}
                                    onChange={(e) => setPhone(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>Compañía</span>
                                <input type='text' id='compania' className='form-control' placeholder='Compañía' value={company}
                                    onChange={(e) => setCompany(e.target.value)}></input>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button onClick={() => validate()} className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                                </button>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowMembers;
