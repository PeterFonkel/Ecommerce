import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Usuario } from "src/app/seguridad/models/Usuario";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-encabezado",
  templateUrl: "./encabezado.component.html",
  styleUrls: ["./encabezado.component.css"],
})
export class EncabezadoComponent implements OnInit {
  @Input() usuario: Usuario;

  public titulo = environment.title;
  constructor() {}

  ngOnInit() {
  }
}
