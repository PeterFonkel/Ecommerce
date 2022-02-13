import { ProductoCarro } from "src/app/productos/models/ProductoCarro";
import { Rol } from "./Rol";

export interface Usuario {
    nombre: string;
    telefono: string;
    id: string;
    email: string;
    roles: Rol[];
    carro: ProductoCarro[];
    direccionesEntrega: string[];
}
