import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
})
export class OrdenesPage implements OnInit {

  constructor( private _cs:CarritoService, private router:Router ) { }

  ngOnInit() {
    this._cs.cargar_ordenes();
  }

  ordenDetalle( orden ) {
    this.router.navigate( ['/tabs/ordenes/orden-detalle'], { queryParams: { orden: JSON.stringify(orden) } } );
  }

}
