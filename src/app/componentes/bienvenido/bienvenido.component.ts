import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  perfil !: string;
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.obtenerPerfil();
  }

  obtenerPerfil(){
    let obj = JSON.parse(localStorage.getItem('user'));
    if(obj != null){
       this.perfil = obj.perfil;
    }
  }

  cerrarSesion(){
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}
