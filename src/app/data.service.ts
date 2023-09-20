import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { PagesModule } from './pages/pages.module';
import { Pool, QueryResult } from 'pg';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiurl = 'http://localhost:3000/api/';
  
  constructor(private http: HttpClient) {}
  
  getDatos(){
    return this.http.get<any[]>(this.apiurl)
  }

DatosUser(credUser: string, credPass: string){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  let datosUsuario = {
    username: credUser,
    password: credPass
  } || null
  
  this.http.post(this.apiurl + "registrar", datosUsuario, {headers}).subscribe()
  console.log(datosUsuario)
  datosUsuario == null;

}
}
