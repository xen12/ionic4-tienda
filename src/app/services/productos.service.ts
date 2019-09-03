import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { resolve } from 'path';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  pagina:number = 1;
  productos:any[] = [];

  constructor( private httpClient:HttpClient ) {
    this.cargarTodos();
  }

  cargarTodos() {
      let url = environment.URL_SERVICIOS + "/productos/todos/" + this.pagina;
      this.httpClient.get( url )  .subscribe( (data:respuesta) => {
        for(let i=0 ; i<data.productos.length ; i=i+2) {
          let par:any[] = [];
          par.push(data.productos[i]);
          par.push(data.productos[i+1]);
          this.productos.push(par);
        }
        console.log(this.productos);
        this.pagina++;
      }, (error) => {
        console.log(error);
      });
  }

  cargarPagina() {
    let promesa = new Promise( (resolve, reject) => {
      let url = environment.URL_SERVICIOS + "/productos/todos/" + this.pagina;
      this.httpClient.get( url ).subscribe( (data:respuesta) => {
        if( data.productos.length == 0 ) {
           resolve(false);
           return;
        }
        for(let i=0 ; i<data.productos.length ; i=i+2) {
          let par:any[] = [];
          par.push(data.productos[i]);
          par.push(data.productos[i+1]);
          this.productos.push(par);
        }
        console.log(this.productos);
        this.pagina++;
        resolve(true);
      }, (error) => {
        console.log(error);
      });
    });
    return promesa;
  }
}

interface respuesta {
  error:boolean,
  productos?:any[],
  mensaje?:string
}