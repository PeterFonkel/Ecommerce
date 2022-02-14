import { Component,  OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Seccion } from "src/app/secciones/models/Seccion";
import { SeccionesService } from "src/app/secciones/service/secciones.service";
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

  secciones: Seccion[] = [];

  id: string;

  constructor(private loginService: LoginService, 
    private seccionesService: SeccionesService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router) {}

  ngOnInit() {
    //obtengo si esta autenticado y si es admin y me suscribo para configurar lo que se muestra
    this.loginService.getIsLoggedFlagObs().subscribe((flag) => {
      this.isLoggedUser = flag;
    });
     this.loginService.getIsAdminFlagObs().subscribe((flag) => {
      this.isLoggedAdmin = flag;
    });
    this.getSecciones();
    
  }
  cerrarNavBar() {
    $('.navbar-collapse').collapse('hide');
    }

  getSecciones(): void {
    this.seccionesService.getSecciones().subscribe(secciones=>{
      secciones.forEach(seccion => {
        seccion.id = this.seccionesService.getIdseccion(seccion);
      });
      this.secciones = secciones;
    })
  }

  getId(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id=params.id;
    })
  }

  navegarASeccion():void{
  this.router.navigate(['productos/seccion', this.id])
  }
}
