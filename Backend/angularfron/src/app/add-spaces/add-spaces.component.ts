import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpacesService } from '../services/spaces/spaces.service';

@Component({
  selector: 'app-add-spaces',
  templateUrl: './add-spaces.component.html',
  styleUrls: ['./add-spaces.component.css']
})
export class AddSpacesComponent implements OnInit{

  nuevoEspacio = {
    spacename: '',
    description: '',
    capacitance: '',
    precioporhora: '',
  };

  constructor(
    private router: Router,
    private spacesService: SpacesService
  ) {}

  registrarEspacio() {
    
    this.spacesService.agregarEspacio(this.nuevoEspacio).subscribe({
      next: (data) => {
        console.log('Espacio registrado exitosamente:', data);
        alert('¡Espacio registrado exitosamente!');
      },
      error: (err) => {
        console.error('Error al registrar el Espacio:', err);
      }
    });
  }

  ngOnInit(): void {
    
  }
}
