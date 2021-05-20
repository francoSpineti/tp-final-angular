import { Persona } from "./persona";

export class Especialista extends Persona{

    especialidad !: string[];
    imagen !: string;
    emailVerificadoPorAdmin !: boolean;

    constructor(nombre : string, apellido : string, edad : number, dni : number, mail : string, password, perfil : string, especialidad : string, imagen : string
        ,emailVerificadoPorAdmin : boolean){
        super(nombre,apellido,edad,dni,mail,password,perfil);
        this.especialidad.push(especialidad);
        this.imagen = imagen;
        this.emailVerificadoPorAdmin = emailVerificadoPorAdmin;
    }

}
