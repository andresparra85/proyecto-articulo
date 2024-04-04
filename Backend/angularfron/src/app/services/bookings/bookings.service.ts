import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(
    protected http: HttpClient
  ) { }

  obtenerReservas(): Observable<any> {
    let ruta = [environment.apiUrl, 'bookings'].join('/');
    //ruta http://localhost:3000/bookings
    return this.http.get(ruta);
   }

   obtenerReservaId(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'bookings', id].join('/');
    return this.http.get(ruta);
   }

   agregarReserva(usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'bookings/add'].join('/');
    return this.http.post(ruta, usr);
   }

   editarReserva(usr: any, id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'bookings', id].join('/');
    return this.http.put(ruta, usr);
   }
   
   eliminarReserva(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'bookings', id].join('/');
    return this.http.delete(ruta);
   }
}
