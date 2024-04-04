import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ShowMembersComponent } from './show-members/show-members.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { HomeComponent } from './home/home.component';
import { SpacesComponent } from './spaces/spaces.component';
import { AddSpacesComponent } from './add-spaces/add-spaces.component';
import { ShowBookingsComponent } from './show-bookings/show-bookings.component';
import { AddBookingsComponent } from './add-bookings/add-bookings.component';


@NgModule({
  declarations: [
    AppComponent,
    ShowMembersComponent,
    AddMembersComponent,
    HomeComponent,
    SpacesComponent,
    AddSpacesComponent,
    ShowBookingsComponent,
    AddBookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
