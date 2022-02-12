import { Component, Input, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/pedidos/service/pedidos.service';
import { UsuariosService } from 'src/app/seguridad/service/usuarios.service';
import { ProductoCarro } from '../models/ProductoCarro';
import { ProductosService } from '../service/productos.service';
import Swal from "sweetalert2";
import { Pedido } from 'src/app/pedidos/models/Pedido';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styles: []
})
export class CarroComponent implements OnInit {
  carro: ProductoCarro[] = [];
  direccionEntrega: string;
  @Input() id: string = sessionStorage.getItem("ID");
  precioTotal: number = 0;

  constructor(private productosService: ProductosService, private pedidosService: PedidosService, private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.getCarro();
  }

  //Obtener el carro del usuario loggeado
  getCarro(): void {
    this.precioTotal = 0;
    this.usuariosService.getUsuarioLogeado().subscribe(usuarioApi=>{
      this.usuariosService.getCarroFromUsuario(usuarioApi).subscribe(carro=>{
        this.carro = carro;
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

  //Restar una unidad de un producto añadido al carro
  quitarUnidad(productoSeleccionado: any): void {
    this.productosService.quitarUnidadDelCarro(productoSeleccionado.producto).subscribe(response => {
      this.getCarro();
    })
  }

  //Sumar una unidad de un producto añadido al carro
  sumarUnidad(productoSeleccionado: any): void {
    this.productosService.agregarProductoAlCarro(productoSeleccionado.producto).subscribe(response => {
      this.getCarro();
    })
  }

  //Enviar el pedido
  realizarPedido():void {
    Swal.fire({
      title: `¿Seguro que quieres realizar el pedido?`,
      text: '',
      showDenyButton: true,
      confirmButtonText: 'Si',
      confirmButtonColor: 'green',
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidosService.postPedido(this.carro, this.direccionEntrega).subscribe(response=>{
          Swal.fire('El pedido se ha realizado', '', 'success')
          this.carro = [];
          this.precioTotal = 0;
          this.productosService.vaciarCarro().subscribe();
        })
      } else if (result.isDenied) {
        Swal.fire('El pedido NO se ha realizado', '', 'info')
      }
    })    
  }
}
