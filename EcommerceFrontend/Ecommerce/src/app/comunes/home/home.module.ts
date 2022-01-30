import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SeguridadModule } from 'src/app/seguridad/seguridad.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SeguridadModule
  ]
})
export class HomeModule { }
