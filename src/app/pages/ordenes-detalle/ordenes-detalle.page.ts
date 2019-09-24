import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Orden } from '../../models/orden.interface';

@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.page.html',
  styleUrls: ['./ordenes-detalle.page.scss'],
})
export class OrdenesDetallePage implements OnInit {

  orden:Orden;

  constructor( private activatedRoute:ActivatedRoute ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( (res:Orden) => {
      this.orden = res;
      console.log( this.orden );
    });
  }

}
