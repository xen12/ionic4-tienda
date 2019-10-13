import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform, ModalController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { Alert } from 'selenium-webdriver';
import { respuesta } from '../models/respuesta.interface';
// import { LoginPage } from '../components/login/login.page';
// import { CarritoPage } from '../components/carrito/carrito.page';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items:any[] = [];
  total_carrito:number = 0;
  ordenes:any[] = [];

  constructor( private alertCtrl:AlertController, private platform:Platform, private nativeStorage:NativeStorage, private _us:UsuarioService, private modalCtrl:ModalController, private http:HttpClient ) {
    this.cargarStorage();
    this.actualizar_total();
  }

  async agregarCarrito( item_parametro:any ) {
    for( let item of this.items ) {
      if( item.codigo == item_parametro.codigo ) {
        const alert = await this.alertCtrl.create({
          header: "Item existe",
          subHeader: item_parametro.producto + ", ya se encuentra en su carrito de compras.",
          buttons: ['OK']
        });
        await alert.present();
        return;
      }
    }

    this.items.push( item_parametro );
    this.actualizar_total();
    this.guardarStorage();
  }

  remover_item( idx:number ) {
    this.items.splice( idx, 1 );
    this.guardarStorage();
  }

  async realizar_pedido() {
    let data = new FormData();
    let codigos:string[] = [];

    for( let item of this.items ) {
      codigos.push( item.codigo );
    }

    data.append( 'items', codigos.join(',') )

    let url = `${ environment.URL_SERVICIOS }/pedidos/realizar_orden/${ this._us.token }/${ this._us.id_usuario }`
    this.http.post( url, data ).subscribe( ( resp:respuesta ) => {
      // todo bien!
      console.log(resp);
      if( !resp.error ) {
        this.items = [];
        if( this.platform.is("cordova") ) {
          this.nativeStorage.remove( "items");
        } else {
          localStorage.removeItem("items");
        }
        this.mostrar_alert( "Orden realizada!", "Nos contactaremos con usted proximamente." );
      } else {
        this.mostrar_alert( "Error en la orden", resp.mensaje );
      }
    }, (error) => {
      // Mostrar error
      
    });
  }

  actualizar_total() {
    this.total_carrito = 0;
    for( let item of this.items ) {
      this.total_carrito += Number( item.precio_compra );
    }
  }

  private guardarStorage() {
    if( this.platform.is("cordova") ) {
      // Dispositivo
      this.nativeStorage.setItem( "items", this.items );
    } else {
      // Computadora
      localStorage.setItem("items", JSON.stringify( this.items ));
    }
  }

  cargarStorage() {
    let promesa = new Promise( (resolve, reject) => {
      if( this.platform.is("cordova") ) {
        // Dispositivo
        this.nativeStorage.getItem('items').then( (items) => {
            console.log(items);
            this.items = items;
            resolve();
          },
          (error) => console.error(error)
        );
      } else {
        // Computadora
        if( localStorage.getItem("items") ) {
          this.items = JSON.parse( localStorage.getItem("items") );
        }
        resolve();
      }
    });
    return promesa;
  }

  async pedido_alert() {
    const alert = await this.alertCtrl.create({
      header: "Orden realizada!",
      subHeader: "Nos contactaremos con usted proximamente.",
      buttons: ["OK"]
    });
    return alert.present();
  }

  async mostrar_alert( title:string, subtitle:string ) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subtitle,
      buttons: ["OK"]
    });
    return alert.present();
  }

  cargar_ordenes() {
    let url = `${ environment.URL_SERVICIOS }/pedidos/obtener_pedidos/${ this._us.token }/${ this._us.id_usuario }`;

    this.http.get( url ).subscribe( ( resp:respuesta ) =>{
      // console.log( "gg", resp );
      if( !resp.error ) {
        this.ordenes = resp.ordenes;
      } else {
        // Manejar el error
      }
    });
  }

  borrar_orden( orden_id:string ) {
    let url = `${ environment.URL_SERVICIOS }/pedidos/borrar_pedido/${ this._us.token }/${ this._us.id_usuario }/${ orden_id }`;
    return this.http.delete( url );
  }
}
