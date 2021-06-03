import { Persona } from "./persona";

export class Paciente extends Persona{

    obraSocial !: string;
    imagenUno !: string;
    imagenDos !: string;

    constructor(id ?: string, nombre ?: string, apellido ?: string, edad ?: number, dni ?: number, mail ?: string, password ?: string, perfil ?: string, obraSocial ?: string,
        imagenUno ?: string, imagenDos ?: string){
            super(id,nombre,apellido,edad,dni,mail,password,perfil);
            this.obraSocial = obraSocial;
            this.imagenUno = imagenUno;
            this.imagenDos = imagenDos;
    }

    toJson() : any{
        const json ={
            id : this.id,
            nombre : this.nombre,
            apellido : this.apellido,
            edad : this.edad,
            dni : this.dni,
            email : this.mail,
            perfil : this.perfil,
            obraSocial : this.obraSocial,
            imagenUno : this.imagenUno,
            imagenDos : this.imagenDos
        };
        return json;
    }

    public getID(){
        return this.id;
    }

    public setID(value : string){
        this.id = value;
    }

    public getNombre(){
        return this.nombre;
    }

    public getApellido(){
        return this.apellido;
    }

    public getEdad(){
        return this.edad;
    }

    public getDni(){
        return this.dni;
    }

    public getMail(){
        return this.mail;
    }

    public getPassword(){
        return this.password;
    }

    public getPerfil(){
        return this.perfil;
    }

}
