import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Seccion } from '../../models/Seccion';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styles: []
})
export class SeccionComponent implements OnInit {
  @Input() seccion: Seccion = new Seccion();
  @Output() eliminarSeccion = new EventEmitter<Seccion>();
  @Output() modificarSeccion = new EventEmitter<Seccion>();

  constructor() { }

  ngOnInit() {
    console.log(this.seccion)
  }

  borrarSeccion(): void {
    this.eliminarSeccion.emit(this.seccion);
  }
  renombrarSeccion(): void {
    this.modificarSeccion.emit(this.seccion)
  }

}
