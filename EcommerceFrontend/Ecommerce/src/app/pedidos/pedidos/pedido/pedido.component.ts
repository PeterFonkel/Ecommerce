import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/seguridad/service/login.service';
import { Pedido } from '../../models/Pedido';
import { PedidosService } from '../../service/pedidos.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: []
})
export class PedidoComponent implements OnInit {
  @Output() refreshEvent = new EventEmitter<any>();
  @Input() pedido: Pedido;
  fechaPedido: string;
  fechaEnvio: string;
  fechaEntrega: string;
  userLogged$;
  isLoggedUser;
  isLoggedAdmin;

  constructor(
    private pedidosService: PedidosService, 
    private loginService: LoginService) { }

  ngOnInit() {
    this.formatearFechas();
    this.obtenerPerfilDeUsuario();

  }

  //si existen, las divido obteniendo solo la fecha.
  formatearFechas(): void {
    this.fechaPedido = this.pedido.fechaPedido.toString().split("T")[0];
    if (this.pedido.fechaEnvio) {
      this.fechaEnvio = this.pedido.fechaEnvio.toString().split("T")[0];
    }
    if (this.pedido.fechaEntrega) {
      this.fechaEntrega = this.pedido.fechaEntrega.toString().split("T")[0];
    }
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

  //Marcar como enviado y setear la fecha actual
  enviarPedido(): void {
    this.pedidosService.enviarPedido(this.pedido).subscribe(response => {
      this.pedido.fechaEnvio = response.fechaEnvio;
      this.ngOnInit();
    });
  }

  //Marcar como entergado y setear la fecha actual
  entregarPedido(): void {
    this.pedidosService.entregarPedido(this.pedido).subscribe(response => {
      this.pedido.fechaEntrega = response.fechaEntrega;
      this.ngOnInit();
    });
  }
  //Borrar un pedido
  eliminarPedido(): void {
    this.pedidosService.deletePedido(this.pedido).subscribe(response => {
      this.refreshEvent.emit(true);
    })
  }

}
