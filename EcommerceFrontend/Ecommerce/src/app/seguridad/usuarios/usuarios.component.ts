import { Component, OnInit } from '@angular/core';
import { tiposEnvironment } from 'src/environments/tiposEnvironment';
import { Usuario } from '../models/Usuario';
import { UsuarioImpl } from '../models/UsuarioImpl';
import { LoginService } from '../service/login.service';
import { UsuariosService } from '../service/usuarios.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = new UsuarioImpl();
  roles: string[][] = tiposEnvironment.tipoUsuario;
  password1: string;
  password2: string;

  constructor(
    private usuariosService: UsuariosService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe(response => {
      this.usuarios = this.usuariosService.mapearUsuarios(response)
      console.log(this.usuarios)

    })
  }
  nuevoUsuario(): void {
    if(this.password1 == this.password2){
      this.loginService.signin(this.usuario, this.password1)
    }
    else{
      Swal.fire({
        title: "Error",
        text: "Los password no coinciden",
        icon: "error",
      });
    }
    
  }

}
