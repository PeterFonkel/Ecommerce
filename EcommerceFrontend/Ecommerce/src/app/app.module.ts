import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EsqueletoModule } from "./esqueleto/esqueleto.module";
import { HomeModule } from "./comunes/home/home.module";
import { AcercaModule } from "./comunes/acerca/acerca.module";
import { fichaInterceptor } from "./seguridad/interceptors/ficha.interceptor";
import { SeguridadModule } from "./seguridad/seguridad.module";
import { ProductosModule } from "./productos/productos.module";
import { PedidosModule } from "./pedidos/pedidos.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    EsqueletoModule,
    HomeModule,
    AcercaModule,
    SeguridadModule,
    ProductosModule,
    PedidosModule
  ],
  providers: [fichaInterceptor],
  bootstrap: [AppComponent],
})
export class AppModule {}
