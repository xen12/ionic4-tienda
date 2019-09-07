import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items:any[] = [];

  constructor( private alertCtrl:AlertController, private platform:Platform, private nativeStorage:NativeStorage ) {
    this.cargarStorage();
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
    this.guardarStorage();
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
