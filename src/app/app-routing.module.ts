import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestorComponent } from './pages/admin/gestor/gestor.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { FaqComponent } from './pages/faq/faq.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/login/registro/registro.component';
import { MainComponent } from './pages/main/main.component';
import { GestorUsersComponent } from './pages/admin/gestor-users/gestor-users.component';

const routes: Routes = [
  {path: "inicio", component:MainComponent},
  {path:'', redirectTo: 'inicio', pathMatch: 'full' },

  {path:"login", component:LoginComponent},
  {path:"registro", component:RegistroComponent},

  {path:"faq", component:FaqComponent},

  {path:"eventos", component:EventosComponent, children:[
    {path:"invitados", component:GestorUsersComponent}
  ]},
  
  {path:"gestor", component:GestorComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
