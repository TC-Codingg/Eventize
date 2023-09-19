import { Injectable } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { Pool, QueryResult } from 'pg';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor() {
    /* const conexion = 'postgres://fl0user:FA0kHVcWP5al@ep-autumn-cake-59558031.us-east-2.aws.neon.tech:5432/base-de-datos?sslmode=require'
    const {Pool} = require('pg')
    const sql = new Pool({
      user: 'fl0user',
      host: 'ep-autumn-cake-59558031.us-east-2.aws.neon.tech',
      database: 'base-de-datos',
      password: 'FA0kHVcWP5al',
      port: '5432',
      
    })*/
   }
  datosUsuario: string[] = []
  

DatosUser(credUser: string, credPass: string){
  this.datosUsuario.push(credUser, credPass)
  console.log(this.datosUsuario)
  
  

}
}
