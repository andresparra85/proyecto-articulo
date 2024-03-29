import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingsService } from '../services/bookings/bookings.service';
import { MembersService } from '../services/members/members.service';
import { SpacesService } from '../services/spaces/spaces.service';

@Component({
  selector: 'app-add-bookings',
  templateUrl: './add-bookings.component.html',
  styleUrls: ['./add-bookings.component.css']
})
export class AddBookingsComponent implements OnInit {

  nuevaReserva = {
    startdatetime: '',
    state: '',
    id_member: '',
    id_space: '',
    endDate: '',

  }

  listaMiembros: any[] = [];
  listaEspacios: any[] = [];

  constructor(
    private router: Router,
    private bookingsService: BookingsService,
    private membersService: MembersService,
    private spacesService: SpacesService
  ) {}

  ngOnInit(): void {
    this.loadMembers();
    this.loadSpaces();
  }

  registrarReserva() {
    
    this.bookingsService.agregarReserva(this.nuevaReserva).subscribe({
      next: (data) => {
        console.log('Reserva registrada exitosamente:', data);
        alert('¡Reserva registrada exitosamente!');
      },
      error: (err) => {
        console.error('Error al registrar la reserva:', err);
      }
    });
  }

  loadMembers() {
    this.membersService.obtenerMiembros().subscribe({
      next: (data: any) => {
        this.listaMiembros = data;
        console.log("miembros",this.listaMiembros) 
        console.log(data);
      },
      error: (err) => console.error(err),
    });
  }

  loadSpaces() {
    this.spacesService.obtenerEspacios().subscribe({
      next: (data) => {
        this.listaEspacios = data;
        console.log(data);
      },
      error: (err) => console.error(err),
    });
  }



}
