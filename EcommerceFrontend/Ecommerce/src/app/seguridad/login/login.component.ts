import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RolImpl } from '../models/RolImpl';
import { UsuarioImpl } from '../models/UsuarioImpl';
import { LoginService } from '../service/login.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioNuevo: UsuarioImpl = new UsuarioImpl();
  email: string;
  password1: string;
  password2: string;
  rol: RolImpl = new RolImpl();
  usuarioLoggeado: UsuarioImpl = new UsuarioImpl();
  emailRegistrado: string;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }


  signin(): void {
    this.rol.rolNombre = "ROLE_USER";
    this.usuarioNuevo.roles[0] = this.rol;

    if(this.password1 == this.password2){
      this.loginService.signin(this.usuarioNuevo, this.password1).subscribe(email=>{
        this.emailRegistrado = email;
      })
    }
    else{
      Swal.fire({
        title: "Error",
        text: "Los password no coinciden",
        icon: "error",
      });
    }
  }

  login(): void {
    this.loginService.login(this.email, this.password1).subscribe(usuario=>{
      setTimeout(()=>{
        this.usuarioLoggeado.roles[0].rolNombre = sessionStorage.getItem('ROL');
        this.usuarioLoggeado.email = sessionStorage.getItem('EMAIL')
      },1500)
    })
  }

  exitLogin(): void {
    this.loginService.exitLogin();
    this.usuarioLoggeado = undefined;
    sessionStorage.clear();
    document.location.reload();
  }
}
