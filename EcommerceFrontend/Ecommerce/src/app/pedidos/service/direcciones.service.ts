import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Direccion } from '../models/Direccion';

const cabecera = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {
  endpoint: string = environment.urlAPI;

  constructor(private http: HttpClient) { }

  postDireccion(direccion: Direccion): Observable<any> {
    return this.http.post(this.endpoint + "/direcciones/search/nuevadireccion/" + sessionStorage.getItem("ID"), direccion, cabecera);
  }
  
  getIdDireccion(p: any): string {
    let url = p._links.self.href;
    let trozos = url.split("/");
    return trozos[trozos.length - 1];
  }
  
  getDirecciones(id: string): Observable<any>{
    return this.http.get<any>(this.endpoint + "/direcciones/search/direcciones/" + sessionStorage.getItem("ID"), cabecera).pipe(map(response=>response._embedded.direcciones));
  }
}
