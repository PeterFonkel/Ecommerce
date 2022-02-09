import { Seccion } from "src/app/secciones/models/Seccion";
import { Imagen } from "./imagen";

export class Producto {
    id: string;
    nombre: string;
    descripcion: string;
    descripcionLarga: string;
    precio: number;
    seccion: Seccion = new Seccion();
    imagenPrincipal: Imagen[] = [];
    imagenesSecundarias: Imagen[] = [];
    publicado: boolean = true;
    
    constructor(){ }
  }