export class Persona {

    protected nombre !: string;
    protected apellido !: string;
    protected edad !: number;
    protected dni !: number;
    protected mail !: string;
    protected password !: string;
    protected perfil !: string;

    constructor(nombre : string, apellido : string, edad : number, dni : number, mail : string, password : string, perfil : string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.mail = mail;
        this.password = password;
        this.perfil = perfil;
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
