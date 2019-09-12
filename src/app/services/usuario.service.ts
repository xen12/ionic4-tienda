import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { respuesta } from '../models/respuesta.interface';
import { map } from 'rxjs/operators';

import { AlertController } from '@ionic/angular';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token:string;
  id_usuario:string;

  constructor( private httpClient:HttpClient, private alertCtrl:AlertController ) { }

  ingresar( correo:string, contrasena:string ) {
    // console.log( "entreee" );
    let data = new FormData();
    data.append("correo", correo);
    data.append("contrasena", contrasena);
    
    let url = environment.URL_SERVICIOS + "/login";
    
    // return this.httpClient.post(url, data).pipe(map( (resp:any) =>{
    //   //let data_resp = resp;
    //   console.log( resp );

    //   if( resp.error ) {
    //     this.mostrar_alert( resp.mensaje );
    //   } else {
    //     this.token = resp.token;
    //     this.id_usuario = resp.id_usuario;
    //     // Guardar Storage
    //   }
    // }));

    return this.httpClient.post( url, data ).subscribe( (resp:respuesta) => {
      //let data_resp = resp;
      console.log( resp );

      if( resp.error ) {
        this.mostrar_alert( resp.mensaje );
      } else {
        this.token = resp.token;
        this.id_usuario = resp.id_usuario;

        // Guardar Storage
      }
    });
  }

  async mostrar_alert( mensaje:string ) {
    const alert = await this.alertCtrl.create({
      header: "Error al iniciar",
      subHeader: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

}
