import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../funtions';

const ManageBookings = () => {
    const url = 'http://localhost:3000/bookings';
    const [bookings, setBookings] = useState([]);
    const [id, setId] = useState('');
    const [startdatetime, setStartDatetime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [state, setState] = useState('');
    const [memberId, setMemberId] = useState('');
    const [spaceId, setSpaceId] = useState('');
    const [members, setMembers] = useState([]);
    const [spaces, setSpaces] = useState([]);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');

    useEffect(() => {
        loadBookings();
        loadMembers();
        loadSpaces();
    }, []);

    const loadBookings = async () => {
        try {
            const response = await axios.get(url);
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            show_alerta('Error fetching bookings', 'error');
        }
    }

    const loadMembers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/members');
            setMembers(response.data);
        } catch (error) {
            console.error('Error fetching members:', error);
            show_alerta('Error fetching members', 'error');
        }
    }

    const loadSpaces = async () => {
        try {
            const response = await axios.get('http://localhost:3000/spaces');
            setSpaces(response.data);
        } catch (error) {
            console.error('Error fetching spaces:', error);
            show_alerta('Error fetching spaces', 'error');
        }
    }

    const openModal = (op, id, startdatetime, endDate, state, memberId, spaceId) => {
        setId('');
        setStartDatetime('');
        setEndDate('');
        setState('');
        setMemberId('');
        setSpaceId('');
        setOperation(op);
        if (op === 1) {
            setTitle('Crear Reserva');
        } else if (op === 2) {
            setTitle('Editar Reserva');
            setId(id);
            setStartDatetime(startdatetime);
            setEndDate(endDate);
            setState(state);
            setMemberId(memberId);
            setSpaceId(spaceId);
        }
        
    }

    const validate = () => {
        // Validación de campos
        if (!startdatetime.trim() || !endDate.trim() || !state.trim() || !memberId.trim() || !spaceId.trim()) {
            show_alerta('Por favor complete todos los campos', 'warning');
            return;
        }

        const booking = {
            startdatetime: startdatetime.trim(),
            endDate: endDate.trim(),
            state: state.trim(),
            id_member: memberId.trim(),
            id_space: spaceId.trim()
        };

        if (operation === 1) {
            sendRequest('POST', booking);
        } else {
            booking.id_booking = id;
            sendRequest('PUT', booking);
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
                loadBookings(); // Recargar la lista de reservas después de guardar
            }
        } catch (error) {
            show_alerta('Error en la solicitud', 'error');
            console.error('Error sending request:', error);
        }
    }

    const deleteBooking = (id) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Estás seguro de eliminar esta reserva?',
            icon: 'question',
            text: 'Esta acción no se puede deshacer',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                sendRequest('DELETE', { id_booking: id });
            } else {
                show_alerta('La reserva no fue eliminada', 'info');
            }
        });
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalBookings'>
                                <i className='fa-solid fa-circle-plus'></i> Añadir Reserva
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Fecha y Hora de Inicio</th>
                                        <th>Fecha de Fin</th>
                                        <th>Estado</th>
                                        <th>Usuario</th>
                                        <th>Espacio</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr key={booking.id_booking}>
                                            <td>{index + 1}</td>
                                            <td>{booking.startdatetime}</td>
                                            <td>{booking.endDate}</td>
                                            <td>{booking.state}</td>
                                            <td>{booking.id_member}</td>
                                            <td>{booking.id_space}</td>
                                            <td>
                                                <button onClick={() => openModal(2, booking.id_booking, booking.startdatetime, booking.endDate, booking.state, booking.id_member, booking.id_space)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalBookings'>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                &nbsp;
                                                <button onClick={() => deleteBooking(booking.id_booking)} className='btn btn-danger'>
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
            <div id='modalBookings' className='modal fade' aria-hidden='true'>
    <div className='modal-dialog'>
        <div className='modal-content'>
            <div className='modal-header'>
                <label className='h5'>{title}</label>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
               
                <div className='input-group mb-3'>
                    <span className='input-group-text'>Estado</span>
                    <input type='text' id='state' className='form-control' placeholder='Estado' value={state}
                        onChange={(e) => setState(e.target.value)}></input>
                </div>
                <div className='input-group mb-3'>
                    <span className='input-group-text'>ID de miembro</span>
                    <input type='text' id='memberId' className='form-control' placeholder='ID de miembro' value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}></input>
                </div>
                <div className='input-group mb-3'>
                    <span className='input-group-text'>ID del espacio</span>
                    <input type='text' id='spaceId' className='form-control' placeholder='ID del espacio' value={spaceId}
                        onChange={(e) => setSpaceId(e.target.value)}></input>
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

export default ManageBookings;
