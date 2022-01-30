import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { LoginService } from "../service/login.service";
import { TokenService } from "../service/token.service";

@Injectable({
  providedIn: "root",
})
export class UsuarioGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.tokenService.getToken() || !this.loginService.getIsLoggedFlagObs) {
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
