import { Component , OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BookingsService } from '../services/bookings/bookings.service';


@Component({
  selector: 'app-show-bookings',
  templateUrl: './show-bookings.component.html',
  styleUrls: ['./show-bookings.component.css']
})
export class ShowBookingsComponent implements OnInit {
  
  bookings: any[] = [];
  booking = {
    id_booking: '',
    startdatetime: '',
    state: '',
    id_member: '',
    id_space: '',
    endDate: '',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingsService: BookingsService
  ) {}

  ngOnInit(): void { 
    this.loadBookings();
  }

  loadBookings() {
    this.bookingsService.obtenerReservas().subscribe({
      next: (data) => {
        this.bookings = data;
        console.log(data);
      },
      error: (err) => console.error(err),
    });
  }

  deleteBookings(bookingId: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      this.bookingsService.eliminarReserva(bookingId).subscribe({
        next: () => {
          console.log('Reserva eliminada con éxito.');
          alert('Reserva eliminada con éxito.');
          this.refreshBookingsList();
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar el la reserva. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }

  refreshBookingsList(): void {
    this.bookingsService.obtenerReservas().subscribe({
      next: (data) => {
        this.bookings = data; 
      },
      error: (err) => {
        console.error(err);
        alert('Error al cargar la lista de reservas. Por favor, inténtalo de nuevo.');
      }
    });
  }
}
