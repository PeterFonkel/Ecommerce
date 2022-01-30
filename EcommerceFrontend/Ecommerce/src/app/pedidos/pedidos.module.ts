import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidoComponent } from './pedidos/pedido/pedido.component';


@NgModule({
  declarations: [PedidosComponent, PedidoComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule
  ],
  exports: [
    PedidosComponent,
    PedidoComponent
  ]
})
export class PedidosModule { }
