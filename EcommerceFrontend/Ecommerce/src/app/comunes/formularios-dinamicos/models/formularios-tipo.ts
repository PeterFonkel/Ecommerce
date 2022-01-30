/**
 * clase generica que permite crear tipos de elementos del forumulario
 *
 * a partir de esta clase, extendiendo de ella, se crean tipos de formularios Marcandole el tipo <T> como string y el controlType como el tipo de formulario que se quiera crear, 'texbox', 'dropdown'...
 * 
 * los parametros del constructor son opcionales
 */

export class FormulariosTipo<T> {
  value: T | undefined; // recoge el tipo de valor que recogera el formulario
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string; //campo que se ha de marcar al crear la clase del tipo
  type: string;
  options: { key: string; value: string }[];

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: { key: string; value: string }[]; // en caso de ser un dropdown se le pasaran los posibles clave valor del desplegable
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || "";
    this.type = options.type || "";
    this.options = options.options || [];
  }
}
