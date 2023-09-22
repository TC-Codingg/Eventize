import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

datos: any[] = [];
formulario: any;

username: any;
password: any;
confpass: any;

constructor (private dataservice: DataService, private fb: FormBuilder){

  this.formulario= this.fb.group(
    {
      usernameinput:["",[Validators.required, Validators.minLength(8)]],
      passwordinput:["",[Validators.required]],
      confPass: ["", [Validators.required]]
    }
  );
  
}


get Usernameinter(){
  return this.formulario.get("usernameinput")
}

get Passwordinter(){
  return this.formulario.get("passwordinput")
}

get confirPass(){
  return this.formulario.get("confPass")
}

onRegis(): void {
  this.username = this.formulario.get("usernameinput").value
  this.password = this.formulario.get("passwordinput").value
  this.confpass = this.formulario.get("confPass").value

  if (this.password === this.confpass){
  //Relación con BD
    this.dataservice.RegisUser(this.username, this.password)
  /*this.dataservice.getDatos().subscribe((data) =>{
    this.datos = data;
    console.log(this.datos)
  })*/
    alert("Registrando...");
} 
  else {
    alert("Las contraseñas no coinciden")
  }

}


}

