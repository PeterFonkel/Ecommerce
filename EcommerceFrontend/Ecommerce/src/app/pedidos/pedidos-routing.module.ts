import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoFichaComponent } from './pedido-ficha/pedido-ficha.component';
import { PedidosComponent } from './pedidos/pedidos.component';


const routes: Routes = [
  {
    path: ``,
    children: [
      {
        path: `pedidos`,
        component: PedidosComponent,
      }
    ],
  },
  {
    path: ``,
    children: [
      {
        path: `pedidos/:id`,
        component: PedidoFichaComponent,
      }
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
