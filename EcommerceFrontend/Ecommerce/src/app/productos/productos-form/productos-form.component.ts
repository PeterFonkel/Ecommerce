import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductosService } from '../service/productos.service';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styles: []
})
export class ProductosFormComponent implements OnInit {
  producto: Producto = new Producto();

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
  }

  postProducto(): void {
    console.log("Post producto: ", this.producto)
    this.productosService.postProducto(this.producto).subscribe();
    this.producto = new Producto();
  }
}
