import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { RegistroComponent } from './login/registro/registro.component';
import { MainComponent } from './main/main.component';
import { FaqComponent } from './faq/faq.component';
import { EventosComponent } from './eventos/eventos.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    MainComponent,
    FaqComponent,
    EventosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
