import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembersService } from '../services/members/members.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {

  nuevoMiembro = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
  };

  constructor(
    private router: Router,
    private membersService: MembersService
  ) {}

  registrarMiembro() {
    // Lógica para registrar el nuevo miembro
    this.membersService.agregarMiembros(this.nuevoMiembro).subscribe({
      next: (data) => {
        console.log('Miembro registrado exitosamente:', data);
        alert('Miembro registrado exitosamente.');
        // Redirigir a la página de detalles del miembro recién registrado
        //this.router.navigate(['/members', data.id]);
      },
      error: (err) => {
        console.error('Error al registrar el miembro:', err);
        // Aquí podrías agregar lógica para manejar errores de registro
      }
    });
  }

  ngOnInit(): void {
    // Puedes inicializar datos adicionales si es necesario
  }

}

