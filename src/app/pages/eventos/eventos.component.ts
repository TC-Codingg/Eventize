import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit{

  eventos: {Nombre: string, Categoria: string, Fecha: string, ID: string}[] = [];
  categorias: {ID: string, Tipo: string}[] = [];

  formulario: any;

  constructor(private dataservice: DataService, private fb: FormBuilder, private router: Router){
    this.formulario = this.fb.group(
      {
        Nombreinput:["",[Validators.required, Validators.maxLength(15)]],
        Catinput:["",[Validators.required]],
        Fechainput: ["",[Validators.required]],
        IDEvento: ["",[Validators.required]]
    })
  }

  get Nombreinter(){
    return this.formulario.get("Nombreinput")
  }

  get Catinter(){
    return this.formulario.get("Catinput")
  }

  get Fechainter(){
    return this.formulario.get("Fechainput")
  }
  
  get ID_Evento(){
    return this.formulario.get("IDEvento")
  }


  ngOnInit(): void {
    this.consultarEventos();
    this.consultarCat();
  }

  consultarEventos() {
    this.dataservice.getEventos().subscribe((response: {Nombre: string, Categoria: string, Fecha: string, ID: string}[]) => {
      this.eventos = response;
      console.log("Eventos: ", this.eventos);
    })
  };

  consultarCat(){
    this.dataservice.getCat().subscribe(
      (response: {ID: string, Tipo: string}[]) => {
        this.categorias = response;
        console.log("Categorias: ", this.categorias)
      }
    )
  }

  agregarEvento(){
    this.dataservice.añadirEvento(this.Nombreinter.value, this.Catinter.value, this.Fechainter.value)
    alert("Añadiendo evento...")
    this.consultarEventos()
    
  }

  eliminarEvento(ID: string){
    this.dataservice.eliminarEvento(ID)
  }

  verInv(ID: string){
    let IDe = parseInt(ID, 10)
    this.dataservice.verInv(IDe)
    console.log(ID)
    this.router.navigate(['/eventos/invitados'])
  }
  
  checkVerificado(){
  return this.dataservice.checkVerificado
  }
}
