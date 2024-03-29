import { Component , OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SpacesService } from '../services/spaces/spaces.service';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css']
})
export class SpacesComponent implements OnInit{

  espacios: any[] = [];

  espacio = {
    id_space: '',
    spacename: '',
    description: '',
    capacitance: '',
    precioporhora: '',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spacesService: SpacesService
  ) {}

  ngOnInit(): void {
    this.loadSpaces();
  }

  loadSpaces() {
    this.spacesService.obtenerEspacios().subscribe({
      next: (data) => {
        this.espacios = data;
        console.log(data);
      },
      error: (err) => console.error(err),
    });
  }

  deleteSpaces(spaceId: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este miembro?')) {
      this.spacesService.eliminarEspacio(spaceId).subscribe({
        next: () => {
          console.log('Espacio eliminado con éxito.');
          alert('Espacio eliminado con éxito.');
          this.refreshSpacesList();
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar el miembro. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }

  refreshSpacesList(): void {
    this.spacesService.obtenerEspacios().subscribe({
      next: (data) => {
        this.espacios = data; 
      },
      error: (err) => {
        console.error(err);
        alert('Error al cargar la lista de espacios. Por favor, inténtalo de nuevo.');
      }
    });
  }

}
