import { ProductoCarro } from "src/app/productos/models/ProductoCarro";
import { UsuarioImpl } from "src/app/seguridad/models/UsuarioImpl";

export class Pedido {
    id: string;
    fechaPedido: string;
    enviado:boolean;
    fechaEnvio: string;
    fechaEntrega: string;
    carro: ProductoCarro[] = [];
    precioTotal: number;
    usuario: UsuarioImpl;

    constructor(){

    }
}