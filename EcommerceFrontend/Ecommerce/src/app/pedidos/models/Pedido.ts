import { ProductoCarro } from "src/app/productos/models/ProductoCarro";
import { UsuarioImpl } from "src/app/seguridad/models/UsuarioImpl";
import { Direccion } from "./Direccion";

export class Pedido {
    id: string;
    fechaPedido: string;
    enviado:boolean;
    fechaEnvio: string;
    fechaEntrega: string;
    carro: ProductoCarro[] = [];
    precioTotal: number;
    usuario: UsuarioImpl;
    direccionEntrega: Direccion;

    constructor(){

    }
}