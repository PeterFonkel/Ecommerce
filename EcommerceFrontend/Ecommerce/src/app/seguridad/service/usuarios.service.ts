import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductoCarro } from 'src/app/productos/models/ProductoCarro';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';
import { UsuarioImpl } from '../models/UsuarioImpl';
import { LoginService } from './login.service';

const cabecera = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private endPoint: string = environment.urlAPI + "/usuarios";

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getUsuarioLogeado(): Observable<any> {
    return this.http.get(this.endPoint + "/" + sessionStorage.getItem("ID"))
  }
  getUsuarios(): Observable<any> {
    let usuarios = this.http.get<any>(this.endPoint, cabecera);
    return usuarios;
  }
  getCarroFromUsuario(usuarioApi: any): Observable<ProductoCarro[]> {
    return this.http.get<any>(usuarioApi._links.carro.href, cabecera).pipe(map(response=>response._embedded.productoCarros));
  } 
  mapearCarro(carroApi: any): any[] {
    return carroApi._embedded.productoCarros;
  }
  
  mapearUsuarios(usuariosSinMapear: any): Usuario[]{
    let usuarios = [];
  
    usuariosSinMapear._embedded.usuarios.forEach(element => {
      let id = this.getIdUsuario(element._links.self.href);
      let usuario = new UsuarioImpl();
      usuario.email = element.email;
      usuario.roles[0] = element.rol;
      usuario.id = id;
      usuarios.push(usuario);
    });
    console.log(usuarios)
    return usuarios;
  }

  mapearUsuario(usuarioApi: any): UsuarioImpl {
    let usuario = new UsuarioImpl();
    usuario.nombre = usuarioApi.nombre;
    usuario.telefono = usuarioApi.telefono;
    usuario.id = this.getIdUsuario(usuarioApi._links.self.href);
    usuario.roles = usuarioApi.roles;
    return usuario;
  }

  getIdUsuario(url: string): string {
    let trozos = url.split("/");
    // console.log(`trozos: ${ trozos }`);
    return trozos[trozos.length - 1];
  }

  eliminarUsuario(id: string): void {
    this.loginService.eliminarUsuario(id);
  }

  getIdFromUsuarioApi(usuarioApi: any): string {
    let trozos = usuarioApi._links.self.href.split("/");
    // console.log(`trozos: ${ trozos }`);
    return trozos[trozos.length - 1];
  }
}
