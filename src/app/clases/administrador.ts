import { Persona } from "./persona";

export class Administrador extends Persona{

    imagen !: string;

    constructor(id ?: string, nombre ?: string, apellido ?: string, edad ?: number, dni ?: number, mail ?: string, password ?: string, perfil ?: string, imagen ?: string){
            super(id,nombre,apellido,edad,dni,mail,password,perfil);
            this.imagen = imagen;
    }

    toJson() : any{
        const json ={
            id : this.id,
            nombre : this.nombre,
            apellido : this.apellido,
            edad : this.edad,
            email : this.mail,
            dni : this.dni,
            perfil : this.perfil,
            imagen : this.imagen
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
