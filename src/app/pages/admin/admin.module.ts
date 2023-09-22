import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from '../pages.module';

import { GestorComponent } from './gestor/gestor.component';
import { GestorUsersComponent } from './gestor-users/gestor-users.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    GestorComponent,
  ],
  imports: [
    CommonModule,
    PagesModule,
    BrowserModule
  ]
})
export class AdminModule { }
