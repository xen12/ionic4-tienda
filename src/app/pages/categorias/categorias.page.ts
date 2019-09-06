import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ProductosService } from "../../services/productos.service";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor( private _ps:ProductosService, private router:Router ) { }

  ngOnInit() {
  }

  porCategoria( categoria ) {
    this.router.navigate(["/tabs/categorias/por-categoria"], { queryParams: categoria });
  }

}
