import { Persona } from "./persona";

export class Paciente extends Persona{

    obraSocial !: string;
    imagenUno !: string;
    imagenDos !: string;

    constructor(nombre : string, apellido : string, edad : number, dni : number, mail : string, password : string, perfil : string, obraSocial : string,
        imagenUno : string, imagenDos : string){
            super(nombre,apellido,edad,dni,mail,password,perfil);
            this.obraSocial = obraSocial;
            this.imagenUno = imagenUno;
            this.imagenDos = imagenDos;
    }

}
