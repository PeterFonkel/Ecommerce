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
    this.checkLogin();
  }

  checkLogin(): void {
    this.loginService.checkLogin().subscribe(usuario=>{
      this.usuarioLoggeado = usuario;
    })
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
    this.loginService.loginFirebse(this.email, this.password1).then(userCredentials=>{
      console.log("USERCREDENTIALS: ", userCredentials)
      if(userCredentials){
        this.loginService.loginAPI(userCredentials).subscribe(usuario=>{
          this.usuarioLoggeado = usuario;
        })
      }
  }).catch((reason) => {
    if (reason.code == "auth/user-not-found") {
      Swal.fire({
        title: "Error",
        text: "El usuario no existe",
        icon: "error",
      });
    } else {
      if (reason.code == "auth/wrong-password") {
        Swal.fire({
          title: "Error",
          text: "Contraseña incorrecta",
          icon: "error",
        });
      } else {
        if (reason.code == "auth/network-request-failed") {
          Swal.fire({
            title: "Error",
            text: "Problema de red",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: reason,
            icon: "error",
          });
        }
      }
    }
    console.log("error:", reason);
  });
}

  exitLogin(): void {
    this.loginService.exitLogin();
    this.usuarioLoggeado = undefined;
    sessionStorage.clear();
    document.location.reload();
  }
}
