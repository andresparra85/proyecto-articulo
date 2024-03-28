import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowMembersComponent} from './show-members/show-members.component';
import { AddMembersComponent } from './add-members/add-members.component';

const routes: Routes = [
  {
    path: 'show-members',
    component: ShowMembersComponent
  },
  {
    path: 'add-members',
    component: AddMembersComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
