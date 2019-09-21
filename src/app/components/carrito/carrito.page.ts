import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor( private modalCtrl:ModalController, private _cs:CarritoService ) { }

  ngOnInit() {
  }

}
