import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../funtions';

const ShowSpaces = () => {
    const url = 'http://localhost:3000/spaces';
    const [spaces, setSpaces] = useState([]);
    const [id, setId] = useState('');
    const [spacename, setSpaceName] = useState('');
    const [description, setDescription] = useState('');
    const [capacitance, setCapacitance] = useState('');
    const [precioporhora, setPrecioPorHora] = useState('');
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');

    useEffect(() => {
        getSpaces();
    }, []);

    const getSpaces = async () => {
        try {
            const response = await axios.get(url);
            setSpaces(response.data);
        } catch (error) {
            console.error('Error fetching spaces:', error);
        }
    }

    const openModal = (op, id, spacename, description, capacitance, precioporhora) => {
        setId('');
        setSpaceName('');
        setDescription('');
        setCapacitance('');
        setPrecioPorHora('');
        setOperation(op);
        if (op === 1) {
            setTitle('Registrar Espacio');
        } else if (op === 2) {
            setTitle('Editar Espacio');
            setId(id);
            setSpaceName(spacename);
            setDescription(description);
            setCapacitance(capacitance);
            setPrecioPorHora(precioporhora);
        }
        window.setTimeout(function () {
            document.getElementById('spacename').focus();
        }, 500);
    }

    const validate = () => {
        if (spacename.trim() === '') {
            show_alerta('Por favor ingrese el nombre del espacio', 'warning');
        } else if (description.trim() === '') {
            show_alerta('Por favor ingrese la descripción del espacio', 'warning');
        } else if (capacitance=== '') {
            show_alerta('Por favor ingrese la capacidad del espacio', 'warning');
        } else if (precioporhora.trim() === '') {
            show_alerta('Por favor ingrese el precio por hora del espacio', 'warning');
        } else {
            const space = {
                spacename: spacename.trim(),
                description: description.trim(),
                capacitance: parseInt(capacitance),
                precioporhora: precioporhora.trim()
            };

            if (operation === 1) {
                sendRequest('POST', space);
            } else {
                space.id_space = id;
                sendRequest('PUT', space);
            }
        }
    }

    const sendRequest = async (method, data) => {
        try {
            let response;
            if (method === 'POST') {
                response = await axios.post(`${url}/add`, data);
            } else if (method === 'PUT') {
                response = await axios.put(`${url}/${id}`, data);
            }

            const type = response.data[0];
            const message = response.data[1];
            show_alerta(message, type);
            if (type === 'success') {
                document.getElementById('btnCerrar').click();
                getSpaces();
            }
        } catch (error) {
            show_alerta('Error en la solicitud', 'error');
            console.error('Error sending request:', error);
        }
    }

    const deleteSpace = (id, spacename) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: `¿Seguro de eliminar el espacio ${spacename}?`,
            icon: 'question',
            text: 'Esta acción no se puede deshacer',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                sendRequest('DELETE', { id_space: id });
            } else {
                show_alerta('El espacio NO fue eliminado', 'info');
            }
        });
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalSpaces'>
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
                                    <tr><th>#</th><th>Nombre</th><th>Descripción</th><th>Capacidad</th><th>Precio por Hora</th><th></th></tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {spaces.map((space, index) => (
                                        <tr key={space.id_space}>
                                            <td>{index + 1}</td>
                                            <td>{space.spacename}</td>
                                            <td>{space.description}</td>
                                            <td>{space.capacitance}</td>
                                            <td>{space.precioporhora}</td>
                                            <td>
                                                <button onClick={() => openModal(2, space.id_space, space.spacename, space.description, space.capacitance, space.precioporhora)}
                                                    className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalSpaces'>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                &nbsp;
                                                <button onClick={() => deleteSpace(space.id_space, space.spacename)} className='btn btn-danger'>
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
            <div id='modalSpaces' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>Nombre</span>
                                <input type='text' id='spacename' className='form-control' placeholder='Nombre' value={spacename}
                                    onChange={(e) => setSpaceName(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>Descripción</span>
                                <input type='text' id='description' className='form-control' placeholder='Descripción' value={description}
                                    onChange={(e) => setDescription(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>Capacidad</span>
                                <input type='number' id='capacitance' className='form-control' placeholder='Capacidad' value={capacitance}
                                    onChange={(e) => setCapacitance(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>Precio por Hora</span>
                                <input type='text' id='precioporhora' className='form-control' placeholder='Precio por Hora' value={precioporhora}
                                    onChange={(e) => setPrecioPorHora(e.target.value)}></input>
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

export default ShowSpaces;
