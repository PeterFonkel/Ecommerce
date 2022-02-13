import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductoCarro } from 'src/app/productos/models/ProductoCarro';
import { environment } from 'src/environments/environment';
import { Direccion } from '../models/Direccion';
import { Pedido } from '../models/Pedido';

const cabecera = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  endpoint: string = environment.urlAPI;

  constructor(private http: HttpClient) { }

    postPedido(carro: ProductoCarro[], direccion: Direccion): Observable<any> {
      let pedido = new Pedido();
      pedido.carro = carro;
      pedido.direccionEntrega = direccion;
      return this.http.post(this.endpoint + "/pedidos/search/nuevopedido/" + sessionStorage.getItem("ID"), pedido, cabecera)
    }

    //Obtener lod pedidos del cliente loggeado
    getPedidos(): Observable<Pedido[]> {
      return this.http.get<any>(this.endpoint + "/pedidos/search/pedidos/" + sessionStorage.getItem("ID")).pipe(map(response=>response._embedded.pedidos));
    }

    //Obtener todos los pedidos
    getAllPedidos(): Observable<any>{
      return this.http.get<any>(this.endpoint + "/pedidos", cabecera).pipe(map(response=>response._embedded.pedidos));
    }

    getPedidoFromPedidosApi(pedidoUrl: any): Observable<any> {
      return this.http.get(pedidoUrl._links.pedido.href);
    }

    getPedido(id: string): Observable<Pedido>{
      return this.http.get<any>(this.endpoint + "/pedidos/" + id, cabecera);
    }

    getCarroFromPedidoApi(pedido: any): Observable<any> {
      return this.http.get<any>(pedido._links.carro.href).pipe(map(response=>response._embedded.productoCarros));
    }

    getIdPedido(p: any): string {
      let url = p._links.self.href;
      let trozos = url.split("/");
      return trozos[trozos.length - 1];
    }

    enviarPedido(pedido: Pedido): Observable<any> {
      return this.http.post(this.endpoint + "/pedidos/search/enviarpedido", pedido, cabecera);
    }

    entregarPedido(pedido: Pedido): Observable<any> {
      return this.http.post(this.endpoint + "/pedidos/search/entregarpedido", pedido, cabecera);
    }

    deletePedido(pedido:Pedido): Observable<any> {
      return this.http.delete(this.endpoint + "/pedidos/search/pedidos/" + pedido.id, cabecera)
    }

    getUsuarioFromPedido(pedido: any): Observable<any>{
      return this.http.get(this.endpoint + "/pedidos/" + pedido.id + "/usuario", cabecera);
    }
    
}
