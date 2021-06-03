import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Especialista } from '../clases/especialista';
import { Paciente } from '../clases/paciente';
import { Persona } from '../clases/persona';
import { UsuarioService } from './usuario.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import Swal from 'sweetalert2';
import { Administrador } from '../clases/administrador';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public firebaseAuth : AngularFireAuth, public router: Router,private afs: AngularFirestore,
    private usuarioService : UsuarioService,private storage: AngularFireStorage) { }

  login(email : string, password : string){
    return this.firebaseAuth.signInWithEmailAndPassword(email,password);
  }

  getUser(email : string, uid : any){
    return this.afs.collection('usuarios').doc(uid).get();
  }

  async registrarse(persona : Persona) {
    
    if(persona instanceof Paciente){
      this.crearPaciente(persona);
    }
    if(persona instanceof Especialista){
      this.crearEspecialista(persona);
    }

    if(persona instanceof Administrador){
      this.crearAdministrador(persona);
    }
  }

  private async crearPaciente(persona : Paciente){

    await this.firebaseAuth.createUserWithEmailAndPassword(persona.getMail(), persona.getPassword())
      .then(res=>{
        let obj = localStorage.getItem('user');
        if(obj != null){
          this.sendEmailVerification(res.user);
          persona.setID(res.user.uid); //seteo id
          this.usuarioService.guardarPersona(persona.toJson(),res.user.uid);
          this.mostrarMensaje("Se creo el paciente correctamente!","haga click para continuar.");
          this.router.navigate(['/verUsuarios']);
        }else{
          this.sendEmailVerification(res.user);
          persona.setID(res.user.uid); //seteo id
          this.usuarioService.guardarPersona(persona.toJson(),res.user.uid);
          this.mostrarMensaje("Se creo el paciente correctamente!","haga click para continuar.");
          this.router.navigate(['/']);
        }
      }).catch( error => this.mostrarMensajeError(error.message));
  }

  private async crearEspecialista(persona : Especialista){
    await this.firebaseAuth.createUserWithEmailAndPassword(persona.getMail(), persona.getPassword())
    .then(res=>{
      let obj = localStorage.getItem('user');
      if(obj != null){
        this.sendEmailVerification(res.user);
        persona.setID(res.user.uid); //seteo id
        this.usuarioService.guardarPersona(persona.toJson(),res.user.uid);
        this.mostrarMensaje("Se creo un especialista con exito.","haga click para continuar");
        this.router.navigate(['/verUsuarios']);
      }else{
        this.sendEmailVerification(res.user);
        persona.setID(res.user.uid); //seteo id
        this.usuarioService.guardarPersona(persona.toJson(),res.user.uid);
        this.mostrarMensaje("Se creo un especialista con exito.","haga click para continuar");
        this.router.navigate(['/']);
      }
    }).catch( error => console.log('error',error.message));
  }

  private async crearAdministrador(persona : Administrador){
    await this.firebaseAuth.createUserWithEmailAndPassword(persona.getMail(), persona.getPassword())
    .then(res=>{
      persona.setID(res.user.uid); //seteo id
      this.usuarioService.guardarPersona(persona.toJson(),res.user.uid);
      this.mostrarMensaje("Se creo un administrador con exito.","haga click para continuar");
      this.router.navigate(['/verUsuarios']);
    }).catch( error => console.log('error',error.message));
  }

  async sendEmailVerification(user : any) {
    return await user.sendEmailVerification();
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

  mostrarMensaje(titulo : string,mensaje : string){
    Swal.fire(
       titulo,
       mensaje,
      'success'
    )
  }

  mostrarMensajeError(mensaje : string){
    Swal.fire({
      icon: 'error',
      title: mensaje
    })
  }

}