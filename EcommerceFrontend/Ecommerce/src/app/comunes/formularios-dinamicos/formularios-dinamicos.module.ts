import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioDinamicoComponent } from './formulario-dinamico/formulario-dinamico.component';
import { ElementoFormularioComponent } from './formulario-dinamico/elemento-formulario/elemento-formulario.component';



@NgModule({
  declarations: [FormularioDinamicoComponent, ElementoFormularioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormularioDinamicoComponent
  ]
})
export class FormulariosDinamicosModule { }
