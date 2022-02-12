import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/productos/service/productos.service';
import { LoginService } from 'src/app/seguridad/service/login.service';
import { UsuariosService } from 'src/app/seguridad/service/usuarios.service';
import { Pedido } from '../models/Pedido';
import { PedidosService } from '../service/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: []
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  userLogged$;
  isLoggedUser;
  isLoggedAdmin;

  constructor(
    private pedidosService: PedidosService,
    private productosService: ProductosService,
    private loginService: LoginService,
    private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.obtenerPerfilDeUsuario();
    this.getPedidos();
  }

  obtenerPerfilDeUsuario(): void {
    //obtengo si esta autenticado y si es admin y me suscribo para configurar lo que se muestra
    this.loginService.getIsLoggedFlagObs().subscribe((flag) => {
      this.isLoggedUser = flag;
    });
    this.loginService.getIsAdminFlagObs().subscribe((flag) => {
      this.isLoggedAdmin = flag;
    });
  }

  getPedidos(): void {
    if (this.isLoggedUser && !this.isLoggedAdmin) {
      this.pedidosService.getPedidos().subscribe(pedidos => {
        this.pedidos = pedidos;
        this.pedidos.forEach(pedido => {
          pedido.id = this.pedidosService.getIdPedido(pedido);
          pedido.precioTotal = 0;
          this.pedidosService.getPedidoFromPedidosApi(pedido).subscribe(pedidoApi => {
            this.pedidosService.getUsuarioFromPedido(pedido).subscribe(usuarioApi => {
              pedido.usuario = usuarioApi;
            })
            this.pedidosService.getCarroFromPedidoApi(pedidoApi).subscribe(carro => {
              pedido.carro = carro;
              pedido.carro.forEach(productoCarroApi => {
                productoCarroApi.id = this.productosService.getIdProducto(productoCarroApi);
                this.productosService.getProductoFromProductoCarro(productoCarroApi).subscribe(productoApi => {
                  productoApi.id = this.productosService.getIdProducto(productoApi);
                  productoCarroApi.producto = productoApi;
                  pedido.precioTotal = pedido.precioTotal + productoCarroApi.cantidad * productoApi.precio;
                })
              });
            });
          })
        });
      })
    }
    if (this.isLoggedAdmin) {
      this.pedidosService.getAllPedidos().subscribe(pedidos => {
        this.pedidos = pedidos;
        this.pedidos.forEach(pedido => {
          pedido.id = this.pedidosService.getIdPedido(pedido);
          pedido.precioTotal = 0;
          this.pedidosService.getPedidoFromPedidosApi(pedido).subscribe(pedidoApi => {
            this.pedidosService.getUsuarioFromPedido(pedido).subscribe(usuarioApi => {
              pedido.usuario = usuarioApi
              pedido.usuario.id = this.usuariosService.getIdFromUsuarioApi(usuarioApi);
            })

            this.pedidosService.getCarroFromPedidoApi(pedidoApi).subscribe(carro => {
              pedido.carro = carro;
              pedido.carro.forEach(productoCarroApi => {
                productoCarroApi.id = this.productosService.getIdProducto(productoCarroApi);
                this.productosService.getProductoFromProductoCarro(productoCarroApi).subscribe(productoApi => {
                  productoApi.id = this.productosService.getIdProducto(productoApi);
                  productoCarroApi.producto = productoApi;
                  pedido.precioTotal = pedido.precioTotal + productoCarroApi.cantidad * productoApi.precio;
                })
              });
            });
          })
        });
      })
    }
  };

  filtrar(filtro: string) {
    this.getPedidos();
    let pedidosFiltrado = [];
    setTimeout(() => {
      if (filtro == "enviados") {
        this.pedidos.forEach(pedido => {
          if (pedido.fechaEnvio !== null) {
            pedidosFiltrado.push(pedido);
          }
        });
        console.log(pedidosFiltrado);
        this.pedidos = [];
        this.pedidos = pedidosFiltrado;
      }
      if (filtro == "no_enviados") {
        this.pedidos.forEach(pedido => {
          if (pedido.fechaEnvio == null) {
            pedidosFiltrado.push(pedido);
          }
        });
        console.log(pedidosFiltrado);
        this.pedidos = [];
        this.pedidos = pedidosFiltrado;
      }
      if (filtro == "entregados") {
        this.pedidos.forEach(pedido => {
          if (pedido.fechaEntrega !== null) {
            pedidosFiltrado.push(pedido);
          }
        });
        this.pedidos = [];
        this.pedidos = pedidosFiltrado;
      }

      if (filtro == "no_entregados") {
        this.pedidos.forEach(pedido => {
          if (pedido.fechaEntrega == null && pedido.fechaEnvio !== null) {
            pedidosFiltrado.push(pedido);
          }
        });
        this.pedidos = [];
        this.pedidos = pedidosFiltrado;
      }
    }, 400)
  }
}
