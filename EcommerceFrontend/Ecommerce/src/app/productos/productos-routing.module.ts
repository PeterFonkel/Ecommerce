import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarroComponent } from './carro/carro.component';
import { ProductoFichaComponent } from './producto-ficha/producto-ficha.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { ProductosComponent } from './productos/productos.component';


const routes: Routes = [
  {
    path: ``,
    children: [
      {
        path: `productos`,
        component: ProductosComponent,
      }
    ],
  },
  {
    path: ``,
    children: [
      {
        path: `productos/:id`,
        component: ProductoFichaComponent,
      }
    ],
  },
  {
    path: ``,
    children: [
      {
        path: `carro`,
        component: CarroComponent,
      }
    ],
  },
  {
    path: ``,
    children: [
      {
        path: `productos-form`,
        component: ProductosFormComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
