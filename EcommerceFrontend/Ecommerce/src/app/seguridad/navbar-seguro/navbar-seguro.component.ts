import { Component,  OnInit } from "@angular/core";
import { LoginService } from "../service/login.service";

declare var $: any;
const USER_KEY = "EMAIL";
const ROLE_KEY = "ROL";

@Component({
  selector: "app-navbar-seguro",
  templateUrl: "./navbar-seguro.component.html",
  styleUrls: ["./navbar-seguro.component.css"],
})
export class NavbarSeguroComponent implements OnInit {
  userLogged$;

  isLoggedUser;
  isLoggedAdmin;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    //obtengo si esta autenticado y si es admin y me suscribo para configurar lo que se muestra
    this.loginService.getIsLoggedFlagObs().subscribe((flag) => {
      this.isLoggedUser = flag;
    });
     this.loginService.getIsAdminFlagObs().subscribe((flag) => {
      this.isLoggedAdmin = flag;
    });
  }
  cerrarNavBar() {
    $('.navbar-collapse').collapse('hide');
  }
}
