export class Persona {

    public id !: string;
    public nombre !: string;
    public apellido !: string;
    public edad !: number;
    public dni !: number;
    public mail !: string;
    public password !: string;
    public perfil !: string;

    constructor(id ?: string,nombre ?: string, apellido ?: string, edad ?: number, dni ?: number, mail ?: string, password ?: string, perfil ?: string){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.mail = mail;
        this.password = password;
        this.perfil = perfil;
    }

    public getID(){
        return this.id;
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
