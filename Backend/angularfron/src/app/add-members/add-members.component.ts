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
    
    this.membersService.agregarMiembros(this.nuevoMiembro).subscribe({
      next: (data) => {
        console.log('Miembro registrado exitosamente:', data);
        alert('¡Miembro registrado exitosamente!');
      },
      error: (err) => {
        console.error('Error al registrar el miembro:', err);
      }
    });
  }
  

  ngOnInit(): void {
    
  }

}

