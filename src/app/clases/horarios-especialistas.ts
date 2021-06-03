
export class HorariosEspecialistas {

    id !: string;
    email !: string;
    especialidad !: string;
    listaHorarios !: Array<string>;

    constructor(id ?: string, email ?: string, especialidad ?: string, listaHorarios ?: Array<string>){
        this.id = id;
        this.email = email;
        this.especialidad = especialidad;
        this.listaHorarios = new Array<string>();
        this.listaHorarios = listaHorarios;
    }

    public toJson() : any{
        const json = {
            id : this.id,
            email : this.email,
            especialidad : this.especialidad,
            listaHorarios : this.listaHorarios
        };
        return json;
    }

}
