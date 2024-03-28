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
    this.membersService.obtenerMiembros().subscribe({
      next: (data) => {
        this.miembros = data;
        console.log(data);
      },
      error: (err) => err,
    });
  }
}
