import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrdenesDetallePage } from './ordenes-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenesDetallePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrdenesDetallePage]
})
export class OrdenesDetallePageModule {}
