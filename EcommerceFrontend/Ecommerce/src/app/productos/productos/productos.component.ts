import { Component, OnInit } from '@angular/core';
import { Imagen } from '../models/imagen';
import { Producto } from '../models/producto';
import { ImagenesService } from '../service/imagenes.service';
import { ProductosService } from '../service/productos.service';
declare var $: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  producto: Producto = new Producto();
  productoNuevo: Producto = new Producto();

  imagenPrincipalSubida: Imagen[] = [];
  imagenPrincipalASubir: Imagen = new Imagen();
  archivoPrincipalASubir!: File;

  imagenesSecundariasSubidas: Imagen[] = [];
  imagenesSecundariasASubir: Imagen[] = [];
  archivosSecundariosASubir: File[] = [];


  constructor(
    private productosService: ProductosService, 
    private imagenesService: ImagenesService) { }

  ngOnInit() {

    this.getProductos();
  }

  getProductos(): void {
    this.productosService.getProductos().subscribe(response => {
      this.productosService.mapearProductos(response).subscribe(response => {
        this.productos = response;
        console.log("PRODUCTOS: ", this.productos)
        this.productos.forEach(producto => {
          console.log(Number(producto.id));
          this.imagenesService.getImagenPrincipal(Number(producto.id)).subscribe(imagenPrincipalArray => {
            console.log(imagenPrincipalArray)
            producto.imagenPrincipal = imagenPrincipalArray;
          });
        });
      })
      
    }), err => {
      console.log(err)
    };
  }

  abrirModalModificacion(producto: Producto): void {
    this.producto = producto;
    $("#modificarModal").modal('show');
  }

  modificarProducto(): void {
    this.productosService.patchProducto(this.producto).subscribe(response => {
      this.producto = new Producto();
      this.ngOnInit();
    });
  }

  agregarProducto(): void {
    this.productosService.postProducto(this.productoNuevo).subscribe(productoSinMapear => {
      let id = this.productosService.getIdProducto(productoSinMapear);
      console.log("ID:", id)
      this.subirImagenPrincipal(Number(id));
      this.subirImagenesSecundarias(Number(id));
      this.productoNuevo = new Producto();
      this.ngOnInit();
    })
  }

  eliminarProducto(producto: any): void {
    this.productosService.deleteProducto(producto.id).subscribe(response => {
      this.ngOnInit();
    })
  }

  seleccionarImagen(e: any): any {
    this.imagenPrincipalASubir = new Imagen
      ();
    for (let index = 0; index < e.target.files.length; index++) {
      let imagen = new Imagen();
      imagen.nombre = e.target.files[index].name;
      imagen.url = URL.createObjectURL(e.target.files[index]);
      this.imagenPrincipalASubir = imagen;
      this.archivoPrincipalASubir = e.target.files[index];
    }
  }

  deseleccionarImagen(imagen: Imagen): void {
    //Eliminamos la imagen y el archivo selecionado
    this.imagenPrincipalASubir = new Imagen();
    this.archivoPrincipalASubir = new File([], "");
    $("#file").val('');
  }

  getImagenPrincipal(id: number): void {
    this.imagenesService.getImagenPrincipal(id).subscribe(response => {
      console.log("Respuesta principal service", response);
      this.imagenPrincipalSubida = response;

    })
  }

  subirImagenPrincipal(id: number): void {
    if (this.imagenPrincipalSubida[0]) {
      this.imagenesService.deleteImage(this.imagenPrincipalSubida[0], id);
    }
    this.imagenesService.subirImagen(this.archivoPrincipalASubir, id, "principal");
    this.imagenesService.getImagenPrincipal(id).subscribe(response => {
      this.imagenPrincipalSubida = response;
    })
    this.restartSeleccionImagen();
    this.getImagenPrincipal(id);
  }

  eliminarImagen(imagen: Imagen, id: number): void {
    this.imagenesService.deleteImage(imagen, id);
    this.getImagenPrincipal(id);
    this.getImagenesSecundarias(id);
  }

  restartSeleccionImagen(): void {
    this.imagenPrincipalASubir = new Imagen();
    this.archivoPrincipalASubir = new File([], "");
    $("#file").val('');
  }

  seleccionarImagenes(e: any): void {
    this.imagenesSecundariasASubir = [];
    this.archivosSecundariosASubir = [];
    for (let index = 0; index < e.target.files.length; index++) {
      let imagen = new Imagen();
      imagen.nombre = e.target.files[index].name;
      imagen.url = URL.createObjectURL(e.target.files[index]);
      this.imagenesSecundariasASubir.push(imagen);
      this.archivosSecundariosASubir.push(e.target.files[index]);
    }
  }

  deseleccionarImagenes(imagen: Imagen): void {
    //Eliminamos la imagen del array de selección de Imagenes
    let arrayCambio: Imagen[] = [];
    this.imagenesSecundariasASubir.forEach(element => {
      if (element !== imagen) {
        arrayCambio.push(element);
      }
    })
    this.imagenesSecundariasASubir = arrayCambio;
    //Eliminamos la imagen del array de selección de Archivos
    let arrayCambio2: File[] = [];
    this.archivosSecundariosASubir.forEach(element => {
      if (element.name !== imagen.nombre) {
        arrayCambio2.push(element);
      }
    })
    this.archivosSecundariosASubir = arrayCambio2;
    document.getElementById('uploader2');
    $("#files").val('');
  }

  getImagenesSecundarias(id: number): void {
    this.imagenesService.getImagenesSecundarias(id).subscribe(response => {
      this.imagenesSecundariasSubidas = [];
      console.log("Respuesta secundarias service", response)
      this.imagenesSecundariasSubidas = response;
    })
  }

  subirImagenesSecundarias(id: number): void {
    this.archivosSecundariosASubir.forEach(element => {
      this.imagenesService.subirImagen(element, id, "secundaria");
    })
    this.imagenesService.getImagenesSecundarias(id).subscribe(response => {
      this.imagenesSecundariasSubidas = response;
      console.log("Respuesta secundarias service:", response)
    })
    this.restartSeleccionImagenes();

    setTimeout(() => { this.getImagenesSecundarias(id); }, 4000)

  }

  restartSeleccionImagenes(): void {
    this.imagenesSecundariasASubir = [];
    this.archivosSecundariosASubir = [];
    $("#files").val('');
  }

}
