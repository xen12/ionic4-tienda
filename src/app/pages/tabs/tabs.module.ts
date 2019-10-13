import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: "../home/home.module#HomePageModule"
          },
          {
            path: 'producto',
            loadChildren: '../producto/producto.module#ProductoPageModule'
          }
        ]
      },
      {
        path: 'categorias',
        children: [
          {
            path: '',
            loadChildren: "../categorias/categorias.module#CategoriasPageModule",
          },
          {
            path: 'por-categoria',
            children: [
              {
                path: '',
                loadChildren: "../por-categorias/por-categorias.module#PorCategoriasPageModule",
              },
              {
                path: 'producto',
                loadChildren: '../producto/producto.module#ProductoPageModule'
              }
            ]
          }
        ]
      },
      {
        path: 'ordenes',
        children: [
          {
            path: '',
            loadChildren: "../ordenes/ordenes.module#OrdenesPageModule"
          },
          {
            path: 'orden-detalle',
            loadChildren: "../ordenes-detalle/ordenes-detalle.module#OrdenesDetallePageModule"
          }
        ]
      },
      {
        path: 'busqueda',
        children: [
          {
            path: '',
            loadChildren: "../busqueda/busqueda.module#BusquedaPageModule",
          },
          {
            path: 'producto',
            loadChildren: '../producto/producto.module#ProductoPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: "/tabs/home"
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
