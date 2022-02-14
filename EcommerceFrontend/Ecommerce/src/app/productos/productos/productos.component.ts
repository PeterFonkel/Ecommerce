import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Seccion } from 'src/app/secciones/models/Seccion';
import { SeccionesService } from 'src/app/secciones/service/secciones.service';
import { LoginService } from 'src/app/seguridad/service/login.service';
import { Imagen } from '../models/imagen';
import { Producto } from '../models/producto';
import { ImagenesService } from '../service/imagenes.service';
import { ProductosService } from '../service/productos.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Swal from "sweetalert2";
declare var $: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  //Lista de productos en fuincion del rol
  productos: Producto[] = [];
  //Variable producto para update de ya existentes
  producto: Producto = new Producto();
  //Variable producto para creacion de nuevos
  productoNuevo: Producto = new Producto();

  //Imagen principal
  imagenPrincipalSubida: Imagen[] = [];
  imagenPrincipalASubir: Imagen = new Imagen();
  archivoPrincipalASubir!: File;

  //Imagenes secundarias
  imagenesSecundariasSubidas: Imagen[] = [];
  imagenesSecundariasASubir: Imagen[] = [];
  archivosSecundariosASubir: File[] = [];

  //Flags de rol de usuario loggeado
  isLoggedAdmin;
  isLoggedUser;

  //Secciones
  secciones: Seccion[];
  idSeccion: string;
  //Buscador
  keywords: string[] = [];
  palabras: string;


  constructor(
    private productosService: ProductosService,
    private imagenesService: ImagenesService,
    private loginService: LoginService,
    private seccionesService: SeccionesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getId();
    this.obtenerPerfilDeUsuario();
    this.getSecciones();
    this.getProductos();
  }

  //Obtener el rol del usuario
  obtenerPerfilDeUsuario(): void {

    this.loginService.getIsLoggedFlagObs().subscribe((flag) => {
      this.isLoggedUser = flag;
    });
    this.loginService.getIsAdminFlagObs().subscribe((flag) => {
      this.isLoggedAdmin = flag;
    });
  }

  //Obtener el id de la seccion de la url
  getId(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idSeccion = params.id
    })
  }

  //Obtener productos en función del rol
  getProductos(): Observable<void> {
    this.productos = [];
    //Si es admin obtiene todos los productos
    if (this.isLoggedAdmin) {
      this.productosService.getProductosFiltrados(this.keywords, this.idSeccion).subscribe(productos => {
        this.productos = productos;
        this.productos.forEach(producto => {
          producto.id = this.productosService.getIdProducto(producto);
          this.seccionesService.getSeccionFromProducto(producto).subscribe(seccion => {
            producto.seccion = seccion;
            producto.seccion.id = this.seccionesService.getIdseccion(seccion);
          })
          this.imagenesService.getImagenPrincipal(producto.id).subscribe(imagenPrincipalArray => {
            producto.imagenPrincipal = imagenPrincipalArray;
          });
        });
      }), err => {
        console.log(err)
      };
      return;
    }
    //Si no es admin obtiene solo los productos publicados
    else {
      this.productosService.getProductosPublicadosFiltrados(this.keywords, this.idSeccion).subscribe(productos => {
        this.productos = productos;
        this.productos.forEach(producto => {
          producto.id = this.productosService.getIdProducto(producto);
          this.seccionesService.getSeccionFromProducto(producto).subscribe(seccion => {
            producto.seccion = seccion;
            producto.seccion.id = this.seccionesService.getIdseccion(seccion);
          })
          this.imagenesService.getImagenPrincipal(producto.id).subscribe(imagenPrincipalArray => {
            producto.imagenPrincipal = imagenPrincipalArray;
          });
        });

      }), err => {
        console.log(err)
      };
    }
  }

  //Abrir el modal de Update producto
  abrirModalModificacion(producto: Producto): void {
    this.producto = producto;
    $("#modificarModal").modal('show');
  }

  //Update de producto
  modificarProducto(): void {
    this.productosService.patchProducto(this.producto).subscribe(response => {
      this.producto = new Producto();
      this.ngOnInit();
    });
  }

  //Agregar un nuevo producto
  agregarProducto(): void {
    this.productosService.postProducto(this.productoNuevo).subscribe(productoSinMapear => {
      let id = this.productosService.getIdProducto(productoSinMapear);
      this.subirImagenPrincipal(id);
      this.subirImagenesSecundarias(id);
      this.productoNuevo = new Producto();
      this.ngOnInit();
    })
  }
  //Eliminar de la BBDD un producto, solo será posible si no esta en ningún pedido.
  eliminarProducto(producto: any): void {
    this.productosService.deleteProducto(producto.id).subscribe(response => {
      this.ngOnInit();
    })
  }

  //Seleccionar una imagen del equipo para subir
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

  //Deseleccionar una imagen a subir
  deseleccionarImagen(imagen: Imagen): void {
    //Eliminamos la imagen y el archivo selecionado
    this.imagenPrincipalASubir = new Imagen();
    this.archivoPrincipalASubir = new File([], "");
    $("#file").val('');
  }

  //Obtener la imagen principal de un producto
  getImagenPrincipal(id: string): void {
    this.imagenesService.getImagenPrincipal(id).subscribe(response => {
      this.imagenPrincipalSubida = response;
    })
  }
  //Subir la imagen principal seleccionada
  subirImagenPrincipal(id: string): void {
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

  //Eliminar una imagen
  eliminarImagen(imagen: Imagen, id: string): void {
    this.imagenesService.deleteImage(imagen, id);
    this.getImagenPrincipal(id);
    this.getImagenesSecundarias(id);
  }

  //Borrar la seleccion de imagen principal
  restartSeleccionImagen(): void {
    this.imagenPrincipalASubir = new Imagen();
    this.archivoPrincipalASubir = new File([], "");
    $("#file").val('');
  }

  //Seleccion multiple de imagenes del equipo para subir
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

  //Deseleccionar imagenes para subir
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

  //Obtener las imagenes secundarias de un producto
  getImagenesSecundarias(id: string): void {
    this.imagenesService.getImagenesSecundarias(id).subscribe(response => {
      this.imagenesSecundariasSubidas = [];
      this.imagenesSecundariasSubidas = response;
    })
  }

  //Subir las imagenes secundarias seleccionadas
  subirImagenesSecundarias(id: string): void {
    this.archivosSecundariosASubir.forEach(element => {
      this.imagenesService.subirImagen(element, id, "secundaria");
    })
    this.imagenesService.getImagenesSecundarias(id).subscribe(response => {
      this.imagenesSecundariasSubidas = response;
    })
    this.restartSeleccionImagenes();

    setTimeout(() => { this.getImagenesSecundarias(id); }, 4000)

  }
  //Vaciar los array de seleccion de imagenes.
  restartSeleccionImagenes(): void {
    this.imagenesSecundariasASubir = [];
    this.archivosSecundariosASubir = [];
    $("#files").val('');
  }
  //Obtener las secciones cargadas
  getSecciones(): void {
    this.seccionesService.getSecciones().subscribe(secciones => {
      this.secciones = secciones;
      this.secciones.forEach(seccion => {
        seccion.id = this.seccionesService.getIdseccion(seccion);
      });
    })
  }

  filtrar(): void {
    this.keywords = this.palabras.split(" ");
    this.getProductos();
  }

}
