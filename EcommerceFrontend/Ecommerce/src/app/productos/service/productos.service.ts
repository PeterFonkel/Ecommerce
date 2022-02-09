import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';
import { ImagenesService } from './imagenes.service';

const cabecera = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  endpoint: string = environment.urlAPI;
  productosMapeado: Producto[] = [];

  constructor(private http: HttpClient, private imagenesService: ImagenesService) { }

  getProducto(id: string): Observable<Producto>{
    return this.http.get<any>(this.endpoint + "/productos/" + id)
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<any>(this.endpoint + "/productos", cabecera).pipe(map(response=>response._embedded.productos));
  }

  getProductosPublicados(): Observable<Producto[]> {
    return this.http.get<any>(this.endpoint + "/productos/search/getProductosPublicados", cabecera).pipe(map(response=>response._embedded.productos));
  }

  getProductoUrl(url: string): Observable<any> {
    return this.http.get<any>(url, cabecera);
  }

  getProductoFromProductoCarro(productoEnCarro: any): Observable<Producto> {
    return this.getProductoUrl(productoEnCarro._links.producto.href);
  }

  getIdProducto(p: any): string {
    let url = p._links.self.href;
    let trozos = url.split("/");
    return trozos[trozos.length - 1];
  }

  postProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.endpoint + "/productos/search/productos", producto, cabecera);
  }

  deleteProducto(id: string): Observable<any> {
    console.log(id);
    this.imagenesService.deleteNode(id);
    return this.http.delete(this.endpoint + "/productos/" + id, cabecera);
  }

  patchProducto(producto: Producto): Observable<any> {
    return this.http.patch(this.endpoint + "/productos/search/productos/" + producto.id, producto, cabecera)
  }

  getProductoFronProductoSeleccionado(productoSeleccionado: any):Observable<any> {
    return this.http.get(productoSeleccionado._links.producto.href, cabecera)
  }

  agregarProductoAlCarro(producto: Producto): Observable<Producto[]> {
    return this.http.post<Producto[]>(this.endpoint + `/productos/search/addproducto/` + sessionStorage.getItem("ID"), producto, cabecera);
  }

  quitarUnidadDelCarro(producto: Producto): Observable<any> {
    return this.http.post<any>(this.endpoint + `/productos/search/borrardecarro/` + sessionStorage.getItem("ID"), producto, cabecera);
  }

  vaciarCarro(): Observable<any>{
    return this.http.get(this.endpoint + `/productos/search/vaciarcarro/` + sessionStorage.getItem("ID"), cabecera);
  }
}
