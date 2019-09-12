import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { UsuarioService } from '../../services/usuario.service';

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
    this._us.ingresar( this.correo, this.contrasena );
  }

}
