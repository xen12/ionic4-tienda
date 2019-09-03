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
        data.productos.forEach(element => {
          this.productos.push(element);
        });
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
        data.productos.forEach(element => {
          this.productos.push(element);
        });
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