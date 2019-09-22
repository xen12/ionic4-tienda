import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { UsuarioService } from './usuario.service';
// import { LoginPage } from '../components/login/login.page';
// import { CarritoPage } from '../components/carrito/carrito.page';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items:any[] = [];
  total_carrito:number = 0;

  constructor( private alertCtrl:AlertController, private platform:Platform, private nativeStorage:NativeStorage, private _us:UsuarioService, private modalCtrl:ModalController ) {
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
}
