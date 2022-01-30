import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormulariosTipo } from "../../models/formularios-tipo";

@Component({
  selector: "app-elemento-formulario",
  templateUrl: "./elemento-formulario.component.html",
  styles: [],
})
/**
 * Crea el elemento input segun el controlType.
 *
 * En el Html emplea un ngSwitch para crear el elemento en funcion del tipo que haya recibido en el Input de elemento formulario.
 * <p>
 * Cada una de las posibles opciones de tipo de formulario, deben corresponder con un objeto FormularioTipoImpl con un controlType declarado.
 */
export class ElementoFormularioComponent {
  @Input() elementoFormulario!: FormulariosTipo<any>;

  @Input() form!: FormGroup;

  /**
   * valida el dato introducido en el campo
   */
  get isValid() {
    if (this.form.controls[this.elementoFormulario.key]) {
      return this.form.controls[this.elementoFormulario.key].valid;
    } else {
      return null;
    }
  }

  // onselect(value) {
  //   console.log(value);
  //   let seleccion: string[];
  //   if (!this.elementoFormulario.value) {
  //     seleccion = [];
  //   } else {
  //     seleccion = this.elementoFormulario.value;
  //   }
  //   let num = 0;
  //   if (seleccion.length == 0) {
  //     seleccion.push(value);
  //   } else {
  //     seleccion.forEach((e) => {
  //       num++;
  //       if (e == value) {
  //         seleccion.splice(num, 1);
  //       } else {
  //         seleccion.push(value);
  //       }
  //     });
  //   }
  //   this.elementoFormulario.value = seleccion;
  //   // console.log(this.elementoFormulario);
  // }


}
