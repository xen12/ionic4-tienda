import { Component, OnInit } from '@angular/core';

import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

  hayMas:boolean = true;

  constructor( private _ps:ProductosService ) { }

  ngOnInit() {
  }

  buscarProducto( event:any ) {
    //console.log( event.target.value );
    let valor = event.target.value;
    this._ps.busquedaProducto( valor );
  }

  siguientePagina( event:any ) {
    setTimeout(() => {
      this._ps.cargarPaginaBusquedaProducto( event.target.value ).then(
        (hayMas:boolean) => {
          //console.log("Hay mas: ",hayMas);
          this.hayMas = hayMas;
          event.target.complete();
        }
      );
    }, 500);
  }

}
