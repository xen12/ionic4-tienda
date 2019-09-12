import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from "@angular/common/http";

// Servicios
import { CarritoService } from "./services/carrito.service";
import { ProductosService } from "./services/productos.service";
import { UsuarioService } from "./services/usuario.service";

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { CarritoPage } from './components/carrito/carrito.page';
import { LoginPage } from './components/login/login.page';

@NgModule({
  declarations: [AppComponent, CarritoPage, LoginPage],
  entryComponents: [CarritoPage, LoginPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CarritoService,
    ProductosService,
    UsuarioService,
    NativeStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
