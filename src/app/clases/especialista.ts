import { Persona } from "./persona";

export class Especialista extends Persona{

    especialidad !: string[];
    imagen !: string;

    constructor(nombre : string, apellido : string, edad : number, dni : number, mail : string, password, perfil : string, especialidad : string, imagen : string){
        super(nombre,apellido,edad,dni,mail,password,perfil);
        this.especialidad.push(especialidad);
        this.imagen = imagen;
    }

}
