import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formulario: any;

  UserLog: any;
  PassLog: any;


  constructor (private dataservice: DataService, private fb: FormBuilder){
    this.formulario= this.fb.group(
      {
        usernameinput:["",[Validators.required]],
        passwordinput:["",[Validators.required]]
      }
    );
  }

  get Usernameinter(){
    return this.formulario.get("usernameinput")
  }
  
  get Passwordinter(){
    return this.formulario.get("passwordinput")
  }

  checkValidado(){
    return this.dataservice.checkVerificado
    }
  
  

  onLogin(){
    console.log(this.Usernameinter.value + " en fase 1")
    this.UserLog = this.Usernameinter.value
    this.PassLog = this.Passwordinter.value

    this.dataservice.Login(this.UserLog, this.PassLog)
    alert("Verificando usuario...")
    }

  EliminarUser(){
    this.dataservice.EliminarUser(this.UserLog, this.PassLog)
    alert("Eliminando " + this.UserLog + "...")
  

  }
  
  }

