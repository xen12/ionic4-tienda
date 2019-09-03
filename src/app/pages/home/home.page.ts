import { Component } from '@angular/core';

import { ProductosService } from "../../services/productos.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private _ps:ProductosService ) {}

  

}
