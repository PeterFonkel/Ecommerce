import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionesRoutingModule } from './secciones-routing.module';
import { SeccionesComponent } from './secciones/secciones.component';
import { SeccionComponent } from './secciones/seccion/seccion.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SeccionesComponent, SeccionComponent],
  imports: [
    CommonModule,
    SeccionesRoutingModule,
    FormsModule
  ],
  exports: [SeccionesComponent, SeccionComponent]
})
export class SeccionesModule { }
