import { Component, OnInit } from '@angular/core';
import { Horario } from 'src/app/clases/horario';
import { HorariosEspecialistas } from 'src/app/clases/horarios-especialistas';
import { Dias } from 'src/app/enums/dias';
import { HorariosEspecialistasService } from 'src/app/servicios/horarios-especialistas.service';
import { HorariosService } from 'src/app/servicios/horarios.service';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.css']
})
export class MisHorariosComponent implements OnInit {

  columnasFijas: string[] = ['dia','horarioEntrada','horarioSalida','inicioBrake','finBrake','activo'];
  listaHorarios = new Array<string>(); //carga los select de la tabla
  especialidades = new Array<string>(); // carga las especialidades del select
  dataSource !: Array<string>; // cargo la data con la info de la base

  // valores de las tablas
  especialidad !: string;
  mostrarBotonGuardar : boolean = true;
  idColeccion : string = "";

  constructor(private horarioService : HorariosService,private horarioEspecialistaService : HorariosEspecialistasService) { }

  ngOnInit(): void {
     this.horarioService.getHorarios().subscribe(ref=>{
      let aux : any = ref;
      this.listaHorarios = [];
      aux[0].horariosAtencion.forEach(element => {
        this.listaHorarios.push(element);
      });
    });
    let obj = JSON.parse(localStorage.getItem('user'));
    if(obj != null){
      obj.especialidad.forEach(element => {
        this.especialidades.push(element);
      });
    }
  }

  private cargarDiasDeTrabajo(){
    this.dataSource = new Array<string>();
    this.dataSource.push(new Horario(Dias.LUNES,"","","","",false).toJson());
    this.dataSource.push(new Horario(Dias.MARTES,"","","","",false).toJson());
    this.dataSource.push(new Horario(Dias.MIERCOLES,"","","","",false).toJson());
    this.dataSource.push(new Horario(Dias.JUEVES,"","","","",false).toJson());
    this.dataSource.push(new Horario(Dias.VIERNES,"","","","",false).toJson());
    this.dataSource.push(new Horario(Dias.SABADO,"","","","",false).toJson());
  }

  verOpcion(){
    let obj = JSON.parse(localStorage.getItem('user'));
    if(this.especialidad != null || this.especialidad !== ""){

      this.horarioEspecialistaService.getHorariosPorEmail(obj.email).subscribe(ref=>{
        let aux : any = ref;
        let estaCargada : boolean = false;
        if(aux.length > 0){
          
          aux.forEach(element => {
              this.idColeccion = "";
               this.idColeccion = element.id;
              if(element.especialidad === this.especialidad){
                this.dataSource = new Array<string>();
                  element.listaHorarios.forEach(element => {
                      this.dataSource.push(element);
                      estaCargada = true;
                  });
                  this.mostrarBotonGuardar = false;
              }
          });
          if(this.dataSource == null || !estaCargada){
            this.cargarDiasDeTrabajo();
            this.mostrarBotonGuardar = true;
            this.idColeccion = "";
          }
        }else{
          this.cargarDiasDeTrabajo();
          this.mostrarBotonGuardar = true;
          this.idColeccion = "";
        }
      }).unsubscribe;
    }
  }

  guardarHorarios(){

    let list = new Array<string>();
    this.dataSource.forEach(element => {
      list.push(element);
    });
    let obj = JSON.parse(localStorage.getItem('user'));
    let horariosEspecialistas = new HorariosEspecialistas("",obj.email,this.especialidad,list);
    this.horarioEspecialistaService.guardarHorarios(horariosEspecialistas.toJson());
  }

  modificarHorarios(){

    let list = new Array<string>();
    this.dataSource.forEach(element => {
      list.push(element);
    });
    let obj = JSON.parse(localStorage.getItem('user'));
    let horariosEspecialistas = new HorariosEspecialistas(this.idColeccion,obj.email,this.especialidad,list);
    this.horarioEspecialistaService.modificarHorarios(horariosEspecialistas.toJson());
  }

}
