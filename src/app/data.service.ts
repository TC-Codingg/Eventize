import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { PagesModule } from './pages/pages.module';
import { Pool, QueryResult } from 'pg';
import { FormBuilder, FormGroup } from '@angular/forms';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiurl = 'http://localhost:3000/api/';

  verificado: boolean = false;
  
  constructor(private http: HttpClient) {}
  
  getDatos(){
    return this.http.get<any[]>(this.apiurl)
  }

RegisUser(credUser: string, credPass: string){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  let datosUsuario = {
    username: credUser,
    password: credPass
  } || null
  
  this.http.post(this.apiurl + "registrar", datosUsuario, {headers}).subscribe(
    (response) => {
      alert("Usuario registrado como " + datosUsuario.username)
    }
  )
  console.log(datosUsuario)
  datosUsuario == null;
}

Login(UserLog: string, PassLog: string){
  let datosLog = {
    userlog: UserLog,
    passLog: PassLog
  }

  this.http.post(this.apiurl + "verificar", datosLog).subscribe(
    (response) => {
      alert("Bienvenido a Eventize " + UserLog)
      this.verificado = true
    },
    (error) =>{
      alert("Credenciales incorrectas. Intente nuevamente")
    }
  );
  
}

get checkVerificado(){
  return  this.verificado;
}

EliminarUser(UserLog: string, PassLog: string){
  let datosLog = {
    userlog: UserLog,
    passLog: PassLog
  }
  this.http.post(this.apiurl + "eliminaruser", datosLog).subscribe(
    (response) => {
      alert("Adiós " + UserLog)
      this.verificado = false
    },
    (error) =>{
      alert("No se pudo eliminar. Intente nuevamente")
    }
  );

}

}
