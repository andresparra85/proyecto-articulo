import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpacesService {

  constructor(
    protected http: HttpClient
  ) { }

  obtenerEspacios(): Observable<any> {
    let ruta = [environment.apiUrl, 'spaces'].join('/');
    //ruta http://localhost:3000/spaces
    return this.http.get(ruta);
   }

   obtenerEspacioId(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'spaces', id].join('/');
    return this.http.get(ruta);
   }

   agregarEspacio(usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'spaces/add'].join('/');
    return this.http.post(ruta, usr);
   }

   editarEspacio(usr: any, id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'spaces', id].join('/');
    return this.http.put(ruta, usr);
   }
   
   eliminarEspacio(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'spaces', id].join('/');
    return this.http.delete(ruta);
   }
}
