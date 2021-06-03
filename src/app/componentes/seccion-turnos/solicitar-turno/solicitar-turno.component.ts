import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {

  listaEspecialidades = new Array<string>();
  listaEspecialistas = new Array<Especialista>();
  listaEspecialistasPorEspecialidad = new Array<Especialista>();
  mostrarEspecialistas !: boolean;

  constructor(private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getEspecialistas().subscribe(ref=>{
      let aux : any = ref;
      aux.forEach(element => {
        this.listaEspecialistas.push(element);
      });
      this.listaEspecialistas.forEach(element => {
        element.especialidad.forEach(element => {
          if(!this.listaEspecialidades.includes(element)){
            this.listaEspecialidades.push(element);
          }
        });
      });
    }).unsubscribe;
  }

  cargarEspecialistas(especialidad : string){
    this.listaEspecialistasPorEspecialidad = new Array<Especialista>();
    this.mostrarEspecialistas = false;
    this.listaEspecialistas.forEach(element => {
      element.especialidad.forEach(esp => {
        if(esp.toLowerCase() === especialidad.toLowerCase()){
          this.listaEspecialistasPorEspecialidad.push(element);
        }
      });
    });

    if(this.listaEspecialistasPorEspecialidad.length <= 0){
      this.mostrarEspecialistas = false;
    }else{
      this.mostrarEspecialistas = true;
    }
  }

  cargarHorariosDelEspecialista(){
    
  }

}
