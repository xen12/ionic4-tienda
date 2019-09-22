import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { UsuarioService } from '../../services/usuario.service';
import { respuesta } from '../../models/respuesta.interface';
import { CarritoPage } from '../carrito/carrito.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo:string = "";
  contrasena:string = "";

  constructor( private modalCtrl:ModalController, private _us:UsuarioService ) { }

  ngOnInit() {
  }

  ingresar() {
    this._us.ingresar( this.correo, this.contrasena ).subscribe( (resp:respuesta) => {
      //let data_resp = resp;
      console.log( resp );

      if( resp.error ) {
        this._us.mostrar_alert( resp.mensaje );
      } else {
        this._us.token = resp.token;
        this._us.id_usuario = resp.id_usuario;
        
        // Guardar en Storage
        this._us.guardarStorage();
        this.modalCtrl.dismiss();
        this.redireccionar_carrito();
      }
    });
  }

  async redireccionar_carrito() {
    const modal = await this.modalCtrl.create({
      component: CarritoPage
    });
    return modal.present();
  }

}
