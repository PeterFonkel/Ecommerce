import { Component, OnInit } from '@angular/core';
import { Seccion } from '../models/Seccion';
import { SeccionesService } from '../service/secciones.service';
declare var $: any;

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styles: []
})
export class SeccionesComponent implements OnInit {
  secciones: Seccion[] = [];
  seccionNueva: Seccion = new Seccion();

  constructor(private seccionesService: SeccionesService) { }

  ngOnInit() {
    this.getSecciones();
  }

  getSecciones(): void {
    this.seccionesService.getSecciones().subscribe(secciones=>{  
      this.secciones = secciones;
      this.secciones.forEach(seccion => {
        seccion.id = this.seccionesService.getIdseccion(seccion);
      });
    })

  }

  nuevaSeccion(): void {
    this.seccionesService.nuevaSeccion(this.seccionNueva).subscribe(response=>{
      this.seccionNueva = new Seccion();
      this.ngOnInit();
    })
  }

  eliminarSeccion(seccion: any): void {
    this.seccionesService.eliminarSeccion(seccion).subscribe(response=>{
      this.ngOnInit();
;    });
  }

  modificarSeccion(): void {
    this.seccionesService.modificarSeccion(this.seccionNueva).subscribe(response=>{
      this.seccionNueva = new Seccion();
      this.ngOnInit();
    })
  }

   //Abrir el modal de Update producto
   abrirModalModificacion(seccion: Seccion): void {
    this.seccionNueva = seccion;
    $("#modificarModal").modal('show');
  }

}
