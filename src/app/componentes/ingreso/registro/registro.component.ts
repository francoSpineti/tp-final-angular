import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  mostrarOpciones : boolean = true;
  opcion !: string;
  esAdmin : boolean = false;
  noEstaLogueado !: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
     let obj = JSON.parse(localStorage.getItem('user'));
    if(obj != null){
      this.esAdmin = true;
      this.noEstaLogueado = false;
    }else{
      this.noEstaLogueado = true;
    }
  }

  cambiarOpcion(value : string){
    let obj = JSON.parse(localStorage.getItem('user'));
    this.mostrarOpciones = false;
    this.opcion = value;
    if(obj != null){
      this.esAdmin = true;
      if(this.opcion.toLocaleLowerCase() === "paciente"){
        this.router.navigate(['/altaPaciente']);
        this.mostrarOpciones = true;
      }else if(this.opcion.toLocaleLowerCase() === "especialista"){
        this.router.navigate(['/altaEspecialista']);
        this.mostrarOpciones = true;
      }else if(this.opcion.toLocaleLowerCase() === "administrador"){
        this.router.navigate(['/altaAdministrador']);
        this.mostrarOpciones = true;
      }
    }else{
      this.noEstaLogueado = true;
      if(this.opcion.toLocaleLowerCase() === "paciente"){
        this.router.navigate(['/altaPaciente']);
        this.mostrarOpciones = true;
      }else if(this.opcion.toLocaleLowerCase() === "especialista"){
        this.router.navigate(['/altaEspecialista']);
        this.mostrarOpciones = true;
      }
    }
   }


}
