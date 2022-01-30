import { ProductoCarro } from "src/app/productos/models/ProductoCarro";
import { Rol } from "./Rol";
import { RolImpl } from "./RolImpl";
import { Usuario } from "./Usuario";

export class UsuarioImpl implements Usuario {
  nombre: string;
  telefono: string;
  id: string;
  email: string;
  roles: Rol[]= [];
  carro: ProductoCarro[] = [];
  
  
  constructor(){
    let rol = new RolImpl();
    rol.rolNombre = 'sin_rol'
    this.roles.push(rol);
  }
}
