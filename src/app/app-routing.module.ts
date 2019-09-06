import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'carrito', loadChildren: './pages/carrito/carrito.module#CarritoPageModule' },
  { path: 'categorias', loadChildren: './pages/categorias/categorias.module#CategoriasPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'ordenes', loadChildren: './pages/ordenes/ordenes.module#OrdenesPageModule' },
  { path: 'ordenes-detalle', loadChildren: './pages/ordenes-detalle/ordenes-detalle.module#OrdenesDetallePageModule' },
  { path: 'por-categorias', loadChildren: './pages/por-categorias/por-categorias.module#PorCategoriasPageModule' },
  { path: 'producto', loadChildren: './pages/producto/producto.module#ProductoPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
