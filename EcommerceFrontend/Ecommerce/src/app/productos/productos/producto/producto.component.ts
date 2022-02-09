import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/seguridad/service/login.service';
import { Producto } from '../../models/producto';
import { ProductosService } from '../../service/productos.service';
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {
  @Input() producto: Producto;
  @Output() modificarProductoEvent = new EventEmitter<Producto>();
  @Output() eliminarProductoEvent = new EventEmitter<Producto>();
  isLoggedAdmin;
  isLoggedUser;
  
  constructor(
    private loginService: LoginService, 
    private productosService: ProductosService,
    private router: Router) 
     { }

  ngOnInit() {
    this.obtenerPerfilDeUsuario();
  }

  //Obtener el rol del usuario
  obtenerPerfilDeUsuario(): void {
    //obtengo si esta autenticado y si es admin y me suscribo para configurar lo que se muestra
    this.loginService.getIsLoggedFlagObs().subscribe((flag) => {
      this.isLoggedUser = flag;
    });
    this.loginService.getIsAdminFlagObs().subscribe((flag) => {
      this.isLoggedAdmin = flag;
    });
  }

  //Eliminar un producto. Se emite un evento al contenedor.
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
        this.eliminarProductoEvent.emit(this.producto);   
      } else if (result.isDenied) {
        Swal.fire('El producto NO se ha eliminado', '', 'info')
      }
    })
  }

  //Modal modificar producto
  abrirModalModificacion(): void {
    this.modificarProductoEvent.emit(this.producto);
  }

  //Agregar producto al carro de la compra
  agregarProducto(): void {
    Swal.fire({
      title: `¿Seguro que quieres añadir al carro ${this.producto.nombre}?`,
      showDenyButton: true,
      confirmButtonText: 'Si',
      confirmButtonColor: 'green',
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.agregarProductoAlCarro(this.producto).subscribe(response=>{
          Swal.fire('El producto se ha añadido al carro', '', 'success')
        })
      } else if (result.isDenied) {
        Swal.fire('El producto NO se ha añadido al carro', '', 'info')
      }
    })
  }

  //Retirar producto de la venta
  retirarProducto(): void {
    this.producto.publicado = false;
    this.productosService.patchProducto(this.producto).subscribe()
  }

  //Publicar para la venta un producto 
  publicarProducto(): void {
    this.producto.publicado = true;
    this.productosService.patchProducto(this.producto).subscribe()
  }

  //Abrir la ficha completa del producto
  verFicha(): void {
    this.router.navigate(["productos/productos/"+ this.producto.id])
  }

}
