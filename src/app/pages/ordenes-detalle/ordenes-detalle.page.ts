import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Orden } from '../../models/orden.interface';
import { CarritoService } from '../../services/carrito.service';
import { respuesta } from '../../models/respuesta.interface';

@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.page.html',
  styleUrls: ['./ordenes-detalle.page.scss'],
})
export class OrdenesDetallePage implements OnInit {

  orden:Orden;

  constructor( private activatedRoute:ActivatedRoute, private _cs:CarritoService, private navCtrl:NavController ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( (res) => {
      this.orden = JSON.parse(res.orden);
      console.log(  "recibo", this.orden );
    });
  }

  borrar_orden( orden_id:string ) {
    this._cs.borrar_orden( orden_id ).subscribe( (data:respuesta) => {
      if( data.error ) {
        // Manejo de errores
      } else {
        this.navCtrl.pop();
      }
    });
  }

}
