import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { response } from 'express';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-gestor-users',
  templateUrl: './gestor-users.component.html',
  styleUrls: ['./gestor-users.component.css']
})
export class GestorUsersComponent implements OnInit {

  formulario: any;
  constructor(private dataservice: DataService, private fb: FormBuilder){
    this.formulario = this.fb.group(
      {
        Nombreinput: ["",[Validators.required]],
        Apellidoinput: ["",[Validators.required]],
        DNIinput: ["",[Validators.required]]
      }
    )
  }

  invitados: {Nombre: string, Apellido: string, DNI: string}[] = []

  ngOnInit(): void {
    this.dataservice.resInv().subscribe(
      (response: {Nombre: string, Apellido: string, DNI: string}[]) => {
        this.invitados = response
        console.log("Invitados: ", this.invitados)
      }
    )
  }

  get Nombreinput(){
    return this.formulario.get("Nombreinput")
  }

  get Apellidoinput(){
    return this.formulario.get("Apellidoinput")
  }
  get DNIinput(){
    return this.formulario.get("DNIinput")
  }

  Invitar(){
    this.dataservice.Invitar(this.Nombreinput.value, this.Apellidoinput.value, this.DNIinput.value)
    alert("Invitando a " + this.Nombreinput.value + " " + this.Apellidoinput)
  }


}
