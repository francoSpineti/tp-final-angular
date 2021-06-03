export class Horario {

    dia !: string;
    horarioEntrada !: string;
    horarioSalida !: string;
    inicioBrake !: string;
    finBrake !: string;
    activo !: boolean;

    constructor(dia ?: string,horarioEntrada ?: string, horarioSalida ?: string, inicioBrake ?: string, finBrake ?: string, activo ?: boolean){
        this.dia = dia;
        this.horarioEntrada = horarioEntrada;
        this.horarioSalida = horarioSalida;
        this.inicioBrake = inicioBrake;
        this.finBrake = finBrake;
        this.activo = activo;
    }

    toJson() : any{
        const json ={
            dia : this.dia,
            horarioEntrada : this.horarioEntrada,
            horarioSalida : this.horarioSalida,
            inicioBrake : this.inicioBrake,
            finBrake : this.finBrake,
            activo : this.activo
        };
        return json;
    }
}
