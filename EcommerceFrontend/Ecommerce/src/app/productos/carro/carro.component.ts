import { Component, Input, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/pedidos/service/pedidos.service';
import { UsuariosService } from 'src/app/seguridad/service/usuarios.service';
import { ProductoCarro } from '../models/ProductoCarro';
import { ProductosService } from '../service/productos.service';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styles: []
})
export class CarroComponent implements OnInit {
  carro: ProductoCarro[] = [];
  @Input() id: string = sessionStorage.getItem("ID");
  precioTotal: number = 0;

  constructor(private productosService: ProductosService, private pedidosService: PedidosService, private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.getCarro();
  }

  getCarro(): void {
    this.precioTotal = 0;
    this.usuariosService.getUsuarioLogeado().subscribe(usuarioApi=>{
      this.usuariosService.getCarroFronUsuario(usuarioApi).subscribe(carroApi=>{
        this.carro = this.usuariosService.mapearCarro(carroApi);
        this.carro.forEach(productoEnCarroApi => {
          this.productosService.getProductoFromProductoCarro(productoEnCarroApi).subscribe(producto=>{
            producto.id = this.productosService.getIdProducto(producto)
            productoEnCarroApi.producto = producto;
            this.precioTotal = this.precioTotal + producto.precio*productoEnCarroApi.cantidad;
            productoEnCarroApi.id = this.productosService.getIdProducto(productoEnCarroApi);
          })
        });
      })
    })
  }

  quitarUnidad(productoSeleccionado: any): void {
    this.productosService.quitarUnidadDelCarro(productoSeleccionado.producto).subscribe(response => {
      this.getCarro();
    })
  }

  sumarUnidad(productoSeleccionado: any): void {
    this.productosService.agregarProductoAlCarro(productoSeleccionado.producto).subscribe(response => {
      this.getCarro();
    })
  }
  realizarPedido():void {
    this.pedidosService.postPedido(this.carro).subscribe(response=>{
      this.carro = [];
      this.precioTotal = 0;
      this.productosService.vaciarCarro().subscribe();
    })
  }
}
