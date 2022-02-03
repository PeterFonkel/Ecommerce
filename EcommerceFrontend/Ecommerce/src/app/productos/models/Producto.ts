import { Imagen } from "./imagen";

export class Producto {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    seccion: string;
    imagenPrincipal: Imagen[] = [];
    imagenesSecundarias: Imagen[] = [];
    
    constructor(){ }
  }