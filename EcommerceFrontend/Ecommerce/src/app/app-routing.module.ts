import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./comunes/home/home/home.component";
import { NoEncontradoComponent } from "./esqueleto/no-encontrado/no-encontrado.component";
import { AdminGuard } from "./seguridad/guards/admin.guard";
import { UsuarioGuard } from "./seguridad/guards/usuario.guard";

const routes: Routes = [
  {
    path: ``,
    component: HomeComponent,
  },
  {
    path: `acerca`,
    loadChildren: () =>
      import("src/app/comunes/acerca/acerca.module").then(
        (m) => m.AcercaModule ),
  },
  {
    path: `productos`,
    loadChildren: () =>
      import("src/app/productos/productos.module").then(
        (m) => m.ProductosModule),
    canActivate: [UsuarioGuard],
  },
  {
    path: `seguridad`,
    loadChildren: () =>
      import("src/app/seguridad/seguridad.module").then(
        (m) => m.SeguridadModule ),
    canActivate: [AdminGuard],
  },{
    path: `pedidos`,
    loadChildren: () =>
      import("src/app/pedidos/pedidos.module").then(
        (m) => m.PedidosModule ),
    canActivate: [AdminGuard],
  },{
    path: `secciones`,
    loadChildren: () =>
      import("src/app/secciones/secciones.module").then(
        (m) => m.SeccionesModule),
    canActivate: [UsuarioGuard],
  },
  {
    path: `**`,
    redirectTo: `not-found`,
  },
  {
    path: `not-found`,
    component: NoEncontradoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
