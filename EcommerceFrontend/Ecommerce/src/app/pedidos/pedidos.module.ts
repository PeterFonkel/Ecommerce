import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidoComponent } from './pedidos/pedido/pedido.component';
import { PedidoFichaComponent } from './pedido-ficha/pedido-ficha.component';


@NgModule({
  declarations: [PedidosComponent, PedidoComponent, PedidoFichaComponent],
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
