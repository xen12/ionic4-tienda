import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute } from "@angular/router";

import { Linea } from '../../models/linea.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-por-categorias',
  templateUrl: './por-categorias.page.html',
  styleUrls: ['./por-categorias.page.scss'],
})
export class PorCategoriasPage implements OnInit {

  linea:Linea;
  hayMas:boolean = true;

  constructor( private activatedRoute:ActivatedRoute, private _ps:ProductosService ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( (res:Linea) => {
      this.linea = res;
      //console.log(this.linea);

      this._ps.cargarPorCategoria( this.linea.id );
    });
  }

  siguientePagina( event ) {
    setTimeout(() => {
      this._ps.cargarPaginaPorCategoria( this.linea.id ).then(
        (hayMas:boolean) => {
          //console.log("Hay mas: ",hayMas);
          this.hayMas = hayMas;
          event.target.complete();
        }
      );
    }, 500);
  }
}
