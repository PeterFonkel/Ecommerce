import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  @Input() usuario: Usuario;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
  }
  eliminarUsuario(): void {
    this.usuariosService.eliminarUsuario(this.usuario.id);
  }

}
