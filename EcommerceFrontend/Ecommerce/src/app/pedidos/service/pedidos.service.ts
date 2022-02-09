import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductoCarro } from 'src/app/productos/models/ProductoCarro';
import { environment } from 'src/environments/environment';
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

    postPedido(carro: ProductoCarro[]): Observable<any> {
      let pedido = new Pedido();
      pedido.carro = carro;
      return this.http.post(this.endpoint + "/pedidos/search/nuevopedido/" + sessionStorage.getItem("ID"), pedido, cabecera)
    }

    //Obtener lod pedidos del cliente loggeado
    getPedidos(): Observable<any> {
      return this.http.get<any>(this.endpoint + "/pedidos/search/pedidos/" + sessionStorage.getItem("ID")).pipe(map(response=>response._embedded.pedidos));
    }

    //Obtener todos los pedidos
    getAllPedidos(): Observable<any>{
      return this.http.get(this.endpoint + "/pedidos", cabecera)
    }

    getPedidoFromPedidosApi(pedidoUrl: any): Observable<any> {
      return this.http.get(pedidoUrl._links.pedido.href);
    }

    getCarroFromPedidoApi(pedido: any): Observable<any> {
      return this.http.get(pedido._links.carro.href);
    }

    mapearCarro(carroApi: any): ProductoCarro[] {
      return carroApi._embedded.productoCarros;
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
