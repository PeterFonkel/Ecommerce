import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Seccion } from '../models/Seccion';

const cabecera = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class SeccionesService {

  endpoint: string = environment.urlAPI + "/secciones"

  constructor(private http: HttpClient) { }

  getSecciones(): Observable<Seccion[]>{
    return this.http.get<any>(this.endpoint, cabecera).pipe(map(response=>response._embedded.secciones));
  }

  getIdseccion(p: any): string {
    let url = p._links.self.href;
    let trozos = url.split("/");
    return trozos[trozos.length - 1];
  }
  nuevaSeccion(seccion: Seccion): Observable<any>{
    return this.http.post(this.endpoint, seccion, cabecera);
  }

  eliminarSeccion(seccion: Seccion): Observable<any> {
    console.log(this.endpoint + "/" + seccion.id)
    return this.http.delete(this.endpoint + "/" + seccion.id, cabecera)
  }

  modificarSeccion(seccion: Seccion): Observable<any> {
    return this.http.patch(this.endpoint + "/" + seccion.id, seccion, cabecera);
  }

  getSeccionFromProducto(producto: any): Observable<Seccion>{
    return this.http.get<Seccion>(producto._links.seccion.href, cabecera);
  } 

}
