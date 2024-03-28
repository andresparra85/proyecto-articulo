import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(
    protected http: HttpClient
  ) { }

  obtenerMiembros(): Observable<any> {
    let ruta = [environment.apiUrl, 'members'].join('/');
    //ruta http://localhost:3000/members
    return this.http.get(ruta);
   }

   obtenerMiembrosId(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'members', id].join('/');
    return this.http.get(ruta);
   }

   agregarMiembros(usr: any): Observable<any> {
    let ruta = [environment.apiUrl, 'members/add'].join('/');
    return this.http.post(ruta, usr);
   }

   editarMiembro(usr: any, id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'members', id].join('/');
    return this.http.put(ruta, usr);
   }
   
   eliminarMiembro(id: any): Observable<any> {
    let ruta = [environment.apiUrl, 'members', id].join('/');
    return this.http.delete(ruta);
   }
}
