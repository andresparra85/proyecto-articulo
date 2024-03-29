import { Component , OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MembersService } from '../services/members/members.service';

@Component({
  selector: 'app-show-members',
  templateUrl: './show-members.component.html',
  styleUrls: ['./show-members.component.css']
})

export class ShowMembersComponent implements OnInit{
  miembros: any[] = [];
  miembro = {
    id_member: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
  };


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private membersService: MembersService
  ) {}
  ngOnInit(): void {
    this.loadMembers(); 

  }

  loadMembers() {
    this.membersService.obtenerMiembros().subscribe({
      next: (data) => {
        this.miembros = data;
        console.log(data);
      },
      error: (err) => console.error(err),
    });
  }

  deleteMember(memberId: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este miembro?')) {
      this.membersService.eliminarMiembro(memberId).subscribe({
        next: () => {
          console.log('Miembro eliminado con éxito.');
          alert('Miembro eliminado con éxito.');
          this.refreshMembersList();
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar el miembro. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }
  
  refreshMembersList(): void {
    this.membersService.obtenerMiembros().subscribe({
      next: (data) => {
        this.miembros = data; 
      },
      error: (err) => {
        console.error(err);
        alert('Error al cargar la lista de miembros. Por favor, inténtalo de nuevo.');
      }
    });
  }
  
}
