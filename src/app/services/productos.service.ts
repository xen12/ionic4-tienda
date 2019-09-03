import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";

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
    this.httpClient.get( url ).subscribe( (data:respuesta) => {
      //console.log( data.productos[1] );
      this.productos.push( data.productos );
    }, (error) => {
      console.log(error);
    });
  }
}

interface respuesta {
  error:boolean,
  productos?:any[],
  mensaje?:string
}