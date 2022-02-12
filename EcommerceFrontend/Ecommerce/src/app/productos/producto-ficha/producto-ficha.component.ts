import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/seguridad/service/login.service';
import { Imagen } from '../models/imagen';
import { Producto } from '../models/producto';
import { ImagenesService } from '../service/imagenes.service';
import { ProductosService } from '../service/productos.service';
import Swal from "sweetalert2";
import { SeccionesService } from 'src/app/secciones/service/secciones.service';
import { Seccion } from 'src/app/secciones/models/Seccion';
declare var $: any;

@Component({
  selector: 'app-producto-ficha',
  templateUrl: './producto-ficha.component.html',
  styleUrls: ['./producto-ficha.component.css']
})
export class ProductoFichaComponent implements OnInit {
  id: string;
  producto: Producto = new Producto();
  productoNuevo: Producto = new Producto();
  isLoggedAdmin;
  isLoggedUser;
  imagenSeleccionadaURL: string;

  //Imagen principal
  imagenPrincipalSubida: Imagen[] = [];
  imagenPrincipalASubir: Imagen = new Imagen();
  archivoPrincipalASubir!: File;

  //Imagenes secundarias
  imagenesSecundariasSubidas: Imagen[] = [];
  imagenesSecundariasASubir: Imagen[] = [];
  archivosSecundariosASubir: File[] = [];

  //Secciones
  secciones: Seccion[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productosService: ProductosService,
    private imagenesService: ImagenesService,
    private loginService: LoginService,
    private seccionesService: SeccionesService) { }

  ngOnInit() {
    this.obtenerPerfilDeUsuario();
    this.getId();
    this.getProducto();
    this.getSecciones();
  }

  //Obtener el id del producto de la url
  getId(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id
    })
  }

  //obtengo si esta autenticado y si es admin y me suscribo para configurar lo que se muestra
  obtenerPerfilDeUsuario(): void {
    this.loginService.getIsLoggedFlagObs().subscribe((flag) => {
      this.isLoggedUser = flag;
    });
    this.loginService.getIsAdminFlagObs().subscribe((flag) => {
      this.isLoggedAdmin = flag;
    });
  }

  //Obtener un priducto y sus imagenes a partir del id de la url
  getProducto(): void {
    this.productosService.getProducto(this.id).subscribe(producto => {
      this.producto = producto;
      document.querySelector("#descripcionLarga").innerHTML = this.producto.descripcionLarga.split("\n").join("<br>");
      this.seccionesService.getSeccionFromProducto(this.producto).subscribe(seccion => {
        this.producto.seccion = seccion;
        this.producto.seccion.id = this.seccionesService.getIdseccion(seccion);
      })

      this.imagenesService.getImagenPrincipal(this.id).subscribe(imagenPrincipalArray => {
        this.producto.imagenPrincipal = imagenPrincipalArray;
      })

      this.imagenesService.getImagenesSecundarias(this.id).subscribe(imagenesSecundariasArray => {
        this.producto.imagenesSecundarias = imagenesSecundariasArray;
        this.producto.id = this.id;
      })
    })
    
  }

  //Obtener las secciones disponibles
  getSecciones(): void {
    this.seccionesService.getSecciones().subscribe(secciones => {
      this.secciones = secciones;
      this.secciones.forEach(seccion => {
        seccion.id = this.seccionesService.getIdseccion(seccion);
      });
    })
  }

  //Abrir el modal de Update producto
  abrirModalModificacion(): void {
    $("#modificarModal").modal('show');
  }

  //Update de producto
  modificarProducto(): void {
    this.productosService.patchProducto(this.producto).subscribe(response => {
      this.subirImagenPrincipal(this.producto.id);
      this.subirImagenesSecundarias(this.producto.id);
      this.producto = new Producto();
      setTimeout(() => {
        this.ngOnInit();
      }, 1500)
    });
  }

  //Seleccionar una imagen del equipo para subir
  seleccionarImagen(e: any): any {
    this.imagenPrincipalASubir = new Imagen();
    for (let index = 0; index < e.target.files.length; index++) {
      let imagen = new Imagen();
      imagen.nombre = e.target.files[index].name;
      imagen.url = URL.createObjectURL(e.target.files[index]);
      this.imagenPrincipalASubir = imagen;
      this.archivoPrincipalASubir = e.target.files[index];
    }
  }

  //Subir la imagen principal seleccionada
  subirImagenPrincipal(id: string): void {
    if (this.archivoPrincipalASubir) {
      this.imagenesService.deleteImage(this.producto.imagenPrincipal[0], id);
      this.imagenesService.subirImagen(this.archivoPrincipalASubir, id, "principal");
      this.imagenesService.getImagenPrincipal(id).subscribe(response => {
        this.imagenPrincipalSubida = response;
      })
    }
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
    console.log(this.imagenesSecundariasASubir)
  }

  //Subir las imagenes secundarias seleccionadas
  subirImagenesSecundarias(id: string): void {
    if (this.imagenesSecundariasASubir[0]) {
      this.imagenesService.deleteSecundarias(id).subscribe(response => {
        this.archivosSecundariosASubir.forEach(element => {
          setTimeout(() => {
            this.imagenesService.subirImagen(element, id, "secundaria");
          }, 900)
        })
      })
      this.imagenesSecundariasASubir = [];
    }
  }

  //Eliminar un producto dela aplicación (no será posible si esta en algún pedido)
  eliminarProducto(): void {
    Swal.fire({
      title: `¿Seguro que quieres borrar ${this.producto.nombre}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'grey'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Producto eliminado', '', 'success')
        this.productosService.deleteProducto(this.producto.id).subscribe();
      } else if (result.isDenied) {
        Swal.fire('El producto NO se ha eliminado', '', 'info')
      }
    })
  }

  //Retirar el producto de la venta (no borrarlo), solo lo mostrara a ROLE_ADMIN con anotacion de "NO PUBLICADO"
  retirarProducto(): void {
    this.producto.publicado = false;
    this.productosService.patchProducto(this.producto).subscribe()
  }
  //Publicar a la venta un producto que estaba retirado.
  publicarProducto(): void {
    this.producto.publicado = true;
    this.productosService.patchProducto(this.producto).subscribe()
  }

  //Agregar una unidad del producto al carro de la compra
  agregarProducto(): void {
    Swal.fire({
      title: `¿Seguro que quieres añadir al carro ${this.producto.nombre}?`,
      showDenyButton: true,
      confirmButtonText: 'Si',
      confirmButtonColor: 'green',
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.agregarProductoAlCarro(this.producto).subscribe(response => {
          Swal.fire('El producto se ha añadido al carro', '', 'success')
        })
      } else if (result.isDenied) {
        Swal.fire('El producto NO se ha añadido al carro', '', 'info')
      }
    })
  }
  ampliarImagen(url: string): void {
    this.imagenSeleccionadaURL = url;
    $("#imagenModal").modal('show');
  }
}
