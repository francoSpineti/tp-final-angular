import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
 
  //persona
  nombre !: string;
  apellido !: string;
  edad !: number;
  dni !: number;
  email !: string;
  perfil !: string;
  //paciente
  obraSocial !: string;
  imagenUno !: string;
  imagenDos !: string;
  //especialista
  especialidad ?: Array<string>;
  imagen !: string;
  diasDeTrabajo ?: Array<string>;
  //administrador
  imagenAdm !: string;

  constructor(private storage : AngularFireStorage) { }

  ngOnInit(): void {

    let obj = JSON.parse(localStorage.getItem('user'));

    if(obj != null){

        if(obj.perfil === "paciente"){
          this.nombre = obj.nombre;
          this.apellido = obj.apellido;
          this.edad = obj.edad;
          this.dni = obj.dni;
          this.email = obj.email;
          this.obraSocial = obj.obraSocial;
          this.perfil = obj.perfil;
          this.imagenUno = obj.imagenUno;
          this.imagenDos = obj.imagenDos;
        }else if(obj.perfil === "especialista"){
          this.nombre = obj.nombre;
          this.apellido = obj.apellido;
          this.edad = obj.edad;
          this.dni = obj.dni;
          this.email = obj.email;
          this.especialidad = obj.especialidad;
          this.imagen = obj.imagen;
          this.perfil = obj.perfil;
        }else if(obj.perfil === "administrador"){
          this.nombre = obj.nombre;
          this.apellido = obj.apellido;
          this.edad = obj.edad;
          this.dni = obj.dni;
          this.email = obj.email;
          this.perfil = obj.perfil;
          this.imagenAdm = obj.imagen;
        }
    }
  }

}
