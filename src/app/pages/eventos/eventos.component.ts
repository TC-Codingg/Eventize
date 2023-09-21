import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent {

  constructor(private dataservice: DataService){}

  checkVerificado(){
  return this.dataservice.checkVerificado
  }
}
