import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {
    this.fechaPedido = this.pedido.fechaPedido.toString().split("T")[0];
    this.fechaEnvio = this.pedido.fechaEnvio.toString().split("T")[0];
    this.fechaEntrega = this.pedido.fechaEntrega.toString().split("T")[0];
  }
  enviarPedido(): void {
    this.pedidosService.enviarPedido(this.pedido).subscribe(response=>{
      this.pedido.fechaEnvio = response.fechaEnvio;
      this.ngOnInit();
    });
  }
  entregarPedido(): void {
    this.pedidosService.entregarPedido(this.pedido).subscribe(response=>{
      this.pedido.fechaEntrega = response.fechaEntrega;
      this.ngOnInit();
    });
  }
  eliminarPedido(): void {
    this.pedidosService.deletePedido(this.pedido).subscribe(response=>{
      this.refreshEvent.emit(true);
    })
  }
}
