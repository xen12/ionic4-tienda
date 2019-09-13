import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { respuesta } from '../models/respuesta.interface';
import { map } from 'rxjs/operators';

import { AlertController, Platform, ModalController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { CarritoPage } from '../components/carrito/carrito.page';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token:string;
  id_usuario:string;

  constructor( private httpClient:HttpClient, private alertCtrl:AlertController, private platform:Platform, private nativeStorage:NativeStorage, private modalCtrl:ModalController ) {
    this.cargarStorage(); 
  }

  activo():boolean {
    return ( this.token ) ? true : false;
  }

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
        
        // Guardar en Storage
        this.guardarStorage();
        this.modalCtrl.dismiss();

        this.redireccionar_carrito();
      }
    });
  }

  async redireccionar_carrito() {
    const modal = await this.modalCtrl.create({
      component: CarritoPage
    });
    await modal.present();
  }

  cerrar_sesion() {
    this.token = null;
    this.id_usuario = null;

    // Guardar en Storage
    this.guardarStorage();
  }

  private guardarStorage() {
    if ( this.platform.is("cordova") ) {
      // Dispositivo
      this.nativeStorage.setItem( "token", this.token );
      this.nativeStorage.setItem( "id_usuario", this.id_usuario );
    } else {
      // Computadora
      if ( this.token ) {
        localStorage.setItem("token", this.token );
        localStorage.setItem("id_usuario", this.id_usuario );
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
      }
    }
  }

  private cargarStorage() {
    let promesa = new Promise( (resolve, reject) => {
      if( this.platform.is("cordova") ) {
        // Dispositivo
        this.nativeStorage.getItem('token').then( (token) => {
            // console.log( token );
            this.token = token;
          },
          (error) => console.error(error)
        );
        this.nativeStorage.getItem('id_usuario').then( (id_usuario) => {
          // console.log( token );
          this.id_usuario = id_usuario;
          resolve();
        },
        (error) => console.error(error)
      );
      } else {
        // Computadora
        if( localStorage.getItem("token") ) {
          this.token = localStorage.getItem( "token" );
          this.id_usuario = localStorage.getItem( "id_usuario" );
        }
        resolve();
      }
    });
    return promesa;
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
