import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Persona } from '../clases/persona';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  data !: AngularFirestoreCollection<any>;
  usuariosEnLinea !: Observable<any[]>;

  constructor(public firebaseAuth : AngularFireAuth, public router: Router,private afs: AngularFirestore) { }

  async iniciarSesion(email : string, contraseña : string){
     await this.firebaseAuth.signInWithEmailAndPassword(email, contraseña)
    .then(res =>{
      localStorage.setItem('user',JSON.stringify(res.user));
      this.router.navigate(['/bienvenido']);
    },
    error => alert("Error al iniciar sesion.")
    );
  }

  async registrarse(persona : Persona) {
      const user = await this.firebaseAuth.createUserWithEmailAndPassword(persona.getMail(), persona.getPassword())
      .then(res=>{
        console.log("usuario despues del await: " + user);
        console.log("res despues del await: " + res);
        console.log("res.user despues del await: " + res.user);

        localStorage.setItem('user',JSON.stringify(res.user));
        this.router.navigate(['/bienvenido']);
      },
       error => alert("Error al registrar el usuario.")
      );
  }

  //para grabar la coleccion en la base
  private checkUser(persona : Persona){
    if(persona.getPerfil().toLowerCase() === "paciente"){
      
    }else{ //especialista

    }
  }

  async cerrarSesion() {
    await this.firebaseAuth.signOut()
    .then(res=>{
      localStorage.clear();
      this.router.navigate(['/']);
    },
    error => alert("Error al cerrar sesion.")
    );
  }

  estaLogueado() : boolean{
    return localStorage.getItem("user") != null ? true : false;
  }

  esADmin() : boolean{
    let obj = JSON.parse(localStorage.getItem("user"));
    let retorno : boolean = false;
    if(obj != null){
      obj.perfil === "admin" ? retorno=true : retorno=false;
    }
    return retorno;
  }

  currentUser(){
    return this.firebaseAuth.currentUser;
  }

}
