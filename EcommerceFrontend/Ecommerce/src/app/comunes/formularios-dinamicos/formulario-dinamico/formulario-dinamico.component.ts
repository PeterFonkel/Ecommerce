import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormulariosTipo } from "../models/formularios-tipo";
import { CreadorFormulariosService } from "../services/creador-formularios.service";

@Component({
  selector: "app-formulario-dinamico",
  templateUrl: "./formulario-dinamico.component.html",
  styles: [],
})
export class FormularioDinamicoComponent implements OnInit {
  @Input() elementosForm: FormulariosTipo<string>[] | null = [];
  form!: FormGroup;
  @Output() public payLoad = new EventEmitter<any>();

  constructor(private creadorForm: CreadorFormulariosService) {}

  ngOnInit() {
    this.form = this.creadorForm.crearFormulario(
      this.elementosForm as FormulariosTipo<string>[]
    );
  }

  emitirPayload() {
    
    this.payLoad.emit(this.form.getRawValue());
    this.form.reset
  }
}
