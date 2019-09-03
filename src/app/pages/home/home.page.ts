import { Component } from '@angular/core';

import { ProductosService } from "../../services/productos.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  hayMas:boolean = true;

  constructor( private _ps:ProductosService ) {}

  siguientePagina( event ) {
    setTimeout(() => {
      console.log('Done');
      this._ps.cargarPagina().then(
        (hayMas:boolean) => {
          console.log("Hay mas: ",hayMas);
          this.hayMas = hayMas;
          event.target.complete();
        }
      );
    }, 500);
  }

}
