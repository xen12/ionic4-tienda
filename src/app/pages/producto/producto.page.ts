import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Producto } from "../../models/producto.interface";
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  producto:Producto;

  constructor( private activatedRoute:ActivatedRoute, private navCtrl:NavController, private _cs:CarritoService ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( (res:Producto) => {
      this.producto = res;
      console.log( this.producto.producto );
    });
  }

}
