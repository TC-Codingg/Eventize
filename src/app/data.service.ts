import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { PagesModule } from './pages/pages.module';
import { Pool, QueryResult } from 'pg';
import { FormBuilder, FormGroup } from '@angular/forms';
import { response } from 'express';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiurl = '/api/';

  verificado: boolean = false;
  userId: string | null = null;
  
  constructor(private http: HttpClient, private router: Router) {}
  
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
  } 
  
  this.http.post(this.apiurl + "registrar", datosUsuario, {headers}).subscribe(
    (response) => {
      alert("Usuario registrado como " + datosUsuario.username)
    }
  )
  console.log(datosUsuario)
  datosUsuario === null;
}

Login(UserLog: string, PassLog: string){
  let datosLog = {
    username: UserLog,
    password: PassLog
  }
  this.http.post<{verificado: boolean, idUsuario: string}>(this.apiurl + "verificar", datosLog).subscribe(
    (response) => {
      alert("Bienvenido a Eventize " + UserLog)
      this.verificado = true
      this.userId = response.idUsuario; 
    },
    (error) =>{
      alert("Credenciales incorrectas. Intente nuevamente")
    }
  );
}

verificar (){
  this.http.post(this.apiurl + "guardarsesion", this.verificado).subscribe()
}

sesion(){ //Modificación pendiente
  this.http.get<boolean>(this.apiurl + "traersesion").subscribe(
    (res)=>{
      this.verificado = res;
    })
    
    return this.verificado}


get checkVerificado(){
  return  this.verificado;
}

EliminarUser(UserLog: string, PassLog: string){
  let datosLog = {
    username: UserLog,
    password: PassLog
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

eventos: string[] = []
getEventos(): Observable<{Nombre: string, Categoria: string, Fecha: string, ID: string}[]>{
  return this.http.get<{Nombre: string, Categoria: string, Fecha: string, ID: string}[]>(this.apiurl + "eventos/" + this.userId);
    }

getCat(): Observable<{ID: string, Tipo: string}[]>
{
  return this.http.get<{ID: string, Tipo: string}[]>(this.apiurl + "categorias")  ;
}

añadirEvento(Nombreinput: string, Catinput: string, Fechainput: string){
  let datosEvento = {
    Nombre: Nombreinput,
    Categoria: Catinput,
    Fecha: Fechainput,
    ID_Usuario: this.userId
  }


  this.http.post(this.apiurl + "agregarevento", datosEvento).subscribe(
    (response) => {
      alert("Evento " + Nombreinput + " añadido exitosamente")
    }
  )
}

modEvento(datosNew: {ID: string, Nombre: string, Categoria: string, Fecha: string}){
  console.log("modevento: " , datosNew)
  
  this.http.post(this.apiurl + "modevento" , {datosNew}).subscribe(
    (response) => {
      alert("Evento modificado")
    }
  )
}

eliminarEvento(ID_Evento: string){
  let datosID = {
    ID: ID_Evento
  } 

  this.http.post(this.apiurl + "eliminarevento", datosID).subscribe(
    (response)=>{
      alert("Evento eliminado")
    }
  )
}

Invitar(Nombreinput :string, Apellidoinput: string, DNIinput: string){
  const ID_EventoN = parseInt(this.eventoID.toString(), 10)

  let datosinv = {
    Nombre: Nombreinput,
    Apellido: Apellidoinput,
    DNI: DNIinput,
    ID_Evento: this.eventoID
  } 

  this.http.post(this.apiurl + "invitar", datosinv).subscribe(
    (response)=> {
      alert (Nombreinput + " ha sido invitado")
    }
  )
}

EliminarInv(ID: string){

  console.log("borrar inv ", ID)
  this.http.post(this.apiurl + "eliminarinvitado", {DNI: ID}).subscribe(
    (response) => {
       alert ("Invitado borrado");

       this.verInv(this.eventoID)
    }
  )
}


private respuestaInv = new Subject<any>();
public eventoID = new Number()

verInv(ID: Number){
  let datosID = {
    ID: ID
  }

  this.http.post(this.apiurl + "verinv", datosID).subscribe(
    (response) => {
      this.respuestaInv.next(response)
    }
  )
  this.eventoID = ID
}

resInv(): Observable<{Nombre: string, Apellido: string, DNI: string}[]>{
  return this.respuestaInv;

    }
  
}

