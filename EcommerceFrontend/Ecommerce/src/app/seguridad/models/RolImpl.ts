import { Rol } from "./Rol";

export class RolImpl implements Rol {
    rolNombre: string;
    id: number;
    constructor(){
        this.rolNombre = "sin_rol"
    }
}
