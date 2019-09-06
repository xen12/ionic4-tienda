import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Linea } from '../../models/linea.interface';

@Component({
  selector: 'app-por-categorias',
  templateUrl: './por-categorias.page.html',
  styleUrls: ['./por-categorias.page.scss'],
})
export class PorCategoriasPage implements OnInit {

  linea:Linea;

  constructor( private activatedRoute:ActivatedRoute ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( (res:Linea) => {
      this.linea = res;
      console.log(this.linea);
    });
  }

}
