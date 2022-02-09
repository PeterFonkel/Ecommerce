import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Imagen } from '../../models/imagen';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styles: [
  ]
})
export class ImagenComponent implements OnInit {

  @Input() imagen!: Imagen;
  urlTrusted!: SafeUrl;
  @Output() deselectImageEvent = new EventEmitter<Imagen>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.urlTrusted = this.sanitizer.bypassSecurityTrustUrl(this.imagen.url);
    console.log("IMAGEN: ", this.imagen)
  }
  deseleccionarImagen(): void {
    this.deselectImageEvent.emit(this.imagen);
    
  }
}

