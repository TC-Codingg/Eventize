import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { RegistroComponent } from './login/registro/registro.component';
import { MainComponent } from './main/main.component';
import { FaqComponent } from './faq/faq.component';
import { EventosComponent } from './eventos/eventos.component';



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
    RouterModule
  ]
})
export class PagesModule { }
