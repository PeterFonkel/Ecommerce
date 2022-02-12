import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/productos/service/productos.service';
import { LoginService } from 'src/app/seguridad/service/login.service';
import { Pedido } from '../models/Pedido';
import { PedidosService } from '../service/pedidos.service';

@Component({
  selector: 'app-pedido-ficha',
  templateUrl: './pedido-ficha.component.html',
  styles: []
})
export class PedidoFichaComponent implements OnInit {

  id: string;
  pedido: Pedido = new Pedido();
  isLoggedAdmin;
  isLoggedUser;

  fechaPedido: string;
  fechaEnvio: string;
  fechaEntrega: string;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private loginService: LoginService,
    private pedidoService: PedidosService,
    private productosService: ProductosService) { }

  ngOnInit() {
    this.obtenerPerfilDeUsuario();
    this.getId();
    this.getPedido();
  }

  //Obtener el id del producto de la url
  getId(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id
    })
  }

  //obtengo si esta autenticado y si es admin y me suscribo para configurar lo que se muestra
  obtenerPerfilDeUsuario(): void {
    this.loginService.getIsLoggedFlagObs().subscribe((flag) => {
      this.isLoggedUser = flag;
    });
    this.loginService.getIsAdminFlagObs().subscribe((flag) => {
      this.isLoggedAdmin = flag;
    });
  }

  formatearFechas(): void {
    this.fechaPedido = this.pedido.fechaPedido.toString().split("T")[0];
    if (this.pedido.fechaEnvio) {
      this.fechaEnvio = this.pedido.fechaEnvio.toString().split("T")[0];
    }
    if (this.pedido.fechaEntrega) {
      this.fechaEntrega = this.pedido.fechaEntrega.toString().split("T")[0];
    }
  }

  getPedido(): void {
    this.pedidoService.getPedido(this.id).subscribe(pedido=>{
      this.pedido = pedido;
      this.pedido.id = this.id;
      this.pedidoService.getCarroFromPedidoApi(pedido).subscribe(carro=>{
        this.pedido.carro = carro; 
        carro.forEach(productoCarro => {
          this.productosService.getProductoFromProductoCarro(productoCarro).subscribe(producto=>{
            productoCarro.producto = producto;
          })
          this.formatearFechas();
          this.getUsuario();
        });
      })
    })
  }

  getUsuario(): void {
    this.pedidoService.getUsuarioFromPedido(this.pedido).subscribe(usuario=>{
      this.pedido.usuario = usuario;
    })
  }
}
