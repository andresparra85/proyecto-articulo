import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowMembersComponent} from './show-members/show-members.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { HomeComponent } from './home/home.component';
import { SpacesComponent } from './spaces/spaces.component';
import { AddSpacesComponent } from './add-spaces/add-spaces.component';
import { ShowBookingsComponent } from './show-bookings/show-bookings.component';
import { AddBookingsComponent } from './add-bookings/add-bookings.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'show-members',
    component: ShowMembersComponent
  },
  {
    path: 'add-members',
    component: AddMembersComponent

  },
  {
    path: 'show-spaces',
    component: SpacesComponent
  },
  {
    path: 'add-spaces',
    component: AddSpacesComponent
  },
  {
    path: 'show-bookings',
    component: ShowBookingsComponent
  },
  {
    path: 'add-bookings',
    component: AddBookingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
