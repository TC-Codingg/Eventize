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
  verificado: boolean = false;

  constructor (private datos: DataService, private fb: FormBuilder){
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

  onLogin(){
    console.log(this.Usernameinter.value)
    const UserValido = this.Usernameinter.value === this.datos.datosUsuario[0]
    const PassValida = this.Passwordinter.value === this.datos.datosUsuario[1]
    if (UserValido && PassValida) {
      this.verificado = true
      if (this.verificado == true) {
        alert("Logueado con éxito")
      }
    }
  }


}
