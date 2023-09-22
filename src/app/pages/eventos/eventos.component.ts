import { DatePipe } from '@angular/common';
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
  formularionew: any;

  constructor(private dataservice: DataService, private fb: FormBuilder, private router: Router, private datepipe: DatePipe){
    this.formulario = this.fb.group(
      {
        Nombreinput:["",[Validators.required, Validators.maxLength(15)]],
        Catinput:["",[Validators.required]],
        Fechainput: ["",[Validators.required]],
        IDEvento: ["",[Validators.required]]
    });
    this.formularionew = this.fb.group(
      {
        Nombrenewinput:["",[Validators.required, Validators.maxLength(15)]],
        Catnewinput:["",[Validators.required]],
        Fechanewinput: ["",[Validators.required]],
    });
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
  
  get Nombrenewinter(){
    return this.formularionew.get("Nombrenewinput")
  }

  get Catnewinter(){
    return this.formularionew.get("Catnewinput")
  }

  get Fechanewinter(){
    return this.formularionew.get("Fechanewinput")
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

  mostrarMod: boolean = false
  modID: any;
  mod: {ID: string, Nombre: string, Categoria: string, Fecha: string}[] = [];
  
  nombreselect: any;
  tiposelect: any;
  fechaselect: any;

  get Nombrenew(){
    return this.nombreselect;
  }

  get Catnew(){
    return this.tiposelect;
  }

  get Fechanew(){
    return this.datepipe.transform(this.fechaselect, 'dd/MM/yyyy');
  }



  modEventobutton(ID: string, Nombre: string, Tipo: string, Fecha: string){
    this.mostrarMod = true
    this.modID = ID

    this.nombreselect= Nombre
    this.tiposelect = Tipo
    this.fechaselect = Fecha

    console.log(this.modID, this.nombreselect, this.tiposelect, this.fechaselect)
  }

  modEvento() {
    let datosNew = {
      ID: this.modID ,
      Nombre: this.Nombrenewinter.value, 
      Categoria: this.Catnewinter.value, 
      Fecha: this.Fechanewinter.value
    };
    this.dataservice.modEvento(datosNew)
    }
  
  /*modEvento(){
    this.dataservice.modEvento(ID, Nombre, Tipo, Fecha)

  }*/

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
