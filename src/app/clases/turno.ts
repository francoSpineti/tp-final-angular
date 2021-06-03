import { Especialista } from "./especialista";
import { Paciente } from "./paciente";

export class Turno {

    id !: string;    
    paciente !: Paciente;
    especialista !: Especialista;
    fecha !: Date;
    dia !: Date;
    estado !: string;
    reseña !: string;
    calificarAtencion !: string;
    comentario !: string;
    comentarioCancelacion !: string;

    constructor(id ?: string, paciente ?: Paciente, especialista ?: Especialista,fecha ?: Date, dia ?: Date, estado ?: string,
        reseña ?: string, calificarAtencion ?: string, comentario ?: string, comentarioCancelacion ?: string){

            this.id = id;
            this.paciente = paciente;
            this.especialista = especialista;
            this.fecha = fecha;
            this.dia = dia;
            this.estado = estado;
            this.reseña = reseña;
            this.calificarAtencion = calificarAtencion;
            this.comentario = comentario;
            this.comentarioCancelacion = comentarioCancelacion;
    }

}
