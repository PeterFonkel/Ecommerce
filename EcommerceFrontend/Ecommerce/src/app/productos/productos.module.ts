import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './productos/producto/producto.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { FormsModule } from '@angular/forms';
import { ProductoCarroComponent } from './carro/producto-carro/producto-carro.component';
import { CarroComponent } from './carro/carro.component';
import { ImagenComponent } from './productos/imagen/imagen.component';
import { ProductoFichaComponent } from './producto-ficha/producto-ficha.component';


@NgModule({
  declarations: [ProductosComponent, ProductoComponent, ProductosFormComponent, CarroComponent, ProductoCarroComponent, ImagenComponent, ProductoFichaComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule
  ],
  exports: [
    ProductosComponent,
    CarroComponent
  ]
})
export class ProductosModule { }
