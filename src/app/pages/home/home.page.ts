import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NavController, ModalController } from "@ionic/angular";

import { ProductosService } from "../../services/productos.service";
import { CarritoService } from '../../services/carrito.service';
import { UsuarioService } from '../../services/usuario.service';
import { LoginPage } from '../../components/login/login.page';
import { CarritoPage } from '../../components/carrito/carrito.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  hayMas:boolean = true;

  constructor( private _ps:ProductosService, private navCtrl:NavController, private router:Router, private _cs:CarritoService, private _us:UsuarioService, private modalCtrl:ModalController ) {}

  siguientePagina( event ) {
    setTimeout(() => {
      //console.log('Done');
      this._ps.cargarPagina().then(
        (hayMas:boolean) => {
          //console.log("Hay mas: ",hayMas);
          this.hayMas = hayMas;
          event.target.complete();
        }
      );
    }, 500);
  }

  mostrarProducto( producto ) {
    //console.log( producto );

    this.router.navigate(['/tabs/home/producto'], {queryParams: producto});
  }

  async ver_carrito() {
    if( this._us.token ) {
      // Mostrar página del carrito
      const carrito_modal = await this.modalCtrl.create({
        component: CarritoPage
      });
      carrito_modal.present();
    } else {
      // Mostrar el login
      const carrito_modal = await this.modalCtrl.create({
        component: LoginPage
      });
      carrito_modal.present();
    }

    // modal.onDidDismiss( (abrirCarrito:boolean) => {
    //   if( abrirCarrito ) {
    //     this.modalCtrl.create({
    //       component: CarritoPage
    //     });
    //   }
    // });
  }
}
