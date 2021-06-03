import { Persona } from "./persona";

export class Especialista extends Persona{

    especialidad ?: Array<string>;
    imagen !: string;
    emailVerificadoPorAdmin !: boolean;

    constructor(id ?: string, nombre ?: string, apellido ?: string, edad ?: number, dni ?: number, mail ?: string, password ?: string, perfil ?: string, listaEspecialidades ?:Array<string>, imagen ?: string
        ,emailVerificadoPorAdmin ?: boolean){
        super(id,nombre,apellido,edad,dni,mail,password,perfil);
        this.especialidad = new Array<string>();
        this.especialidad = listaEspecialidades;
        this.imagen = imagen;
        this.emailVerificadoPorAdmin = emailVerificadoPorAdmin;   
    }

    public toJson() : any{
        const json ={
            id : this.id,
            nombre : this.nombre,
            apellido : this.apellido,
            edad : this.edad,
            dni : this.dni,
            email : this.mail,
            perfil : this.perfil,
            especialidad : this.especialidad,
            imagen : this.imagen,
            emailVerificadoPorAdmin : this.emailVerificadoPorAdmin
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
