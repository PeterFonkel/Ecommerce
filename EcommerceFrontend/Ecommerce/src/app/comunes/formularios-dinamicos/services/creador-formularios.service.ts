import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormulariosTipo } from "../models/formularios-tipo";

@Injectable({
  providedIn: "root",
})

/**
 * Genera un formulario a partir de un conjunto de elementos FormularioTipoImpl
 */
export class CreadorFormulariosService {
  
  constructor() {}

  /**
   * genera un elemento inyectable en el html del tipo formGroup a partir de un array de FormulariosTipoImpl
   * @param formularios recibe un array de elementos tipoFormulario
   * @returns El gropo formGroup
   */
  
  crearFormulario(formularios: FormulariosTipo<string>[]) {
    const grupo: any = {};
    formularios.forEach((formulario) => { //agrego cada uno de los formulariosTipo al grupo
      grupo[formulario.key] = formulario.required // voy chequeando si cada uno se recibe con una regla de validacion.
        ? new FormControl(formulario.value || "", Validators.required)
        : new FormControl(formulario.value || "");
    });
    return new FormGroup(grupo);
  }

  crearElementoFormulario(): FormulariosTipo<string> {
    
    return
  }
}
