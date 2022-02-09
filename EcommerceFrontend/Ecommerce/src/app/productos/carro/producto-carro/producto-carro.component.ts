import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoCarro } from '../../models/ProductoCarro';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-producto-carro',
  templateUrl: './producto-carro.component.html',
  styles: []
})
export class ProductoCarroComponent implements OnInit {
  @Input() productoCarro: ProductoCarro;
  @Output() quitarUnidadEvent = new EventEmitter<ProductoCarro>();
  @Output() sumarUnidadEvent = new EventEmitter<ProductoCarro>();

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
  }
  
  quitarUnidad(): void {
    this.quitarUnidadEvent.emit(this.productoCarro);
  }
  sumarUnidad(): void {
    this.sumarUnidadEvent.emit(this.productoCarro);
  }
}
