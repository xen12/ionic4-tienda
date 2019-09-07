import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items:any[] = [];

  constructor( private alertCtrl:AlertController ) { }

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
  }
}
