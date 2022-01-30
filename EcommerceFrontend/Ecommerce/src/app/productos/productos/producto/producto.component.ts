import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/seguridad/service/login.service';
import { UsuariosService } from 'src/app/seguridad/service/usuarios.service';
import { Producto } from '../../models/producto';
import { ProductosService } from '../../service/productos.service';

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
  
  constructor(private loginService: LoginService, private productosService: ProductosService, private usuariosService: UsuariosService) { }

  ngOnInit() {
     //obtengo si esta autenticado y si es admin y me suscribo para configurar lo que se muestra
     this.loginService.getIsLoggedFlagObs().subscribe((flag) => {
      this.isLoggedUser = flag;
    });
     this.loginService.getIsAdminFlagObs().subscribe((flag) => {
      this.isLoggedAdmin = flag;
    });
  }
  eliminarProducto(): void {
    this.eliminarProductoEvent.emit(this.producto);
  }
  abrirModalModificacion(): void {
    this.modificarProductoEvent.emit(this.producto);
  }
  agregarProducto(): void {
    this.productosService.agregarProductoAlCarro(this.producto).subscribe()
  }
}
