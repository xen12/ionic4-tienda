import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { respuesta } from '../models/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  pagina:number = 1;
  productos:any[] = [];
  lineas:any[] = [];
  por_categoria:any[] = [];
  res_busqueda:any[] = [];

  constructor( private httpClient:HttpClient ) {
    this.cargarTodos();
    this.cargarLineas();
  }

  cargarLineas() {
    let url = environment.URL_SERVICIOS + "/lineas";
    this.httpClient.get( url ).subscribe( (data:respuesta) => {
      this.lineas = data.lineas;
      //console.log( this.lineas );
    }, ( error ) => {
      console.log( error );
    });
  }

  cargarPorCategoria( categoria:number ) {
    this.por_categoria = [];
    this.pagina = 1;
    let url = environment.URL_SERVICIOS + "/productos/por_tipo/" + categoria;
      this.httpClient.get( url ).subscribe( (data:respuesta) => {
        data.productos.forEach(element => {
          this.por_categoria.push(element);
        });
        //this.por_categoria.push(data.productos);
        //console.log(this.por_categoria);
        this.pagina++;
      }, (error) => {
        console.log(error);
      });
  }

  cargarPaginaPorCategoria( categoria:number ) {
    let promesa = new Promise( (resolve, reject) => {
      let url = environment.URL_SERVICIOS + "/productos/por_tipo/" + categoria + "/" + this.pagina;
      this.httpClient.get( url ).subscribe( (data:respuesta) => {
        if( data.productos.length == 0 ) {
           resolve(false);
           return;
        }
        data.productos.forEach(element => {
          this.por_categoria.push(element);
        });
        //this.por_categoria.push(data.productos);
        this.pagina++;
        resolve(true);
      }, (error) => {
        console.log(error);
      });
    });
    return promesa;
  }

  cargarTodos() {
      let url = environment.URL_SERVICIOS + "/productos/todos/" + this.pagina;
      this.httpClient.get( url ).subscribe( (data:respuesta) => {
        for(let i=0 ; i<data.productos.length ; i=i+2) {
          let par:any[] = [];
          par.push(data.productos[i]);
          par.push(data.productos[i+1]);
          this.productos.push(par);
        }
        //console.log(this.productos);
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
        //console.log(this.productos);
        this.pagina++;
        resolve(true);
      }, (error) => {
        console.log(error);
      });
    });
    return promesa;
  }

  busquedaProducto( texto:string ) {
    if( texto == "" ) {
      this.res_busqueda = [];
      return;
    }
    this.res_busqueda = [];
    this.pagina = 1;
    let url = environment.URL_SERVICIOS + "/productos/buscar/" + texto;
      this.httpClient.get( url ).subscribe( (data:respuesta) => {
        data.productos.forEach(element => {
          this.res_busqueda.push(element);
        });
        //this.por_categoria.push(data.productos);
        //console.log(this.por_categoria);
        this.pagina++;
      }, (error) => {
        console.log(error);
      });
  }

  cargarPaginaBusquedaProducto( texto:string ) {
    if( texto == "" ) {
      this.res_busqueda = [];
      return;
    }
    let promesa = new Promise( (resolve, reject) => {
      let url = environment.URL_SERVICIOS + "/productos/buscar/" + texto + "/" + this.pagina;
      this.httpClient.get( url ).subscribe( (data:respuesta) => {
        if( data.productos.length == 0 ) {
           resolve(false);
           return;
        }
        data.productos.forEach(element => {
          this.res_busqueda.push(element);
        });
        //this.por_categoria.push(data.productos);
        this.pagina++;
        resolve(true);
      }, (error) => {
        console.log(error);
      });
    });
    return promesa;
  }
}