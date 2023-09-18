import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {



constructor (datos: DataService){}

ngOnInit(): void {}

onRegis(): void {

  alert("");
}  

}


