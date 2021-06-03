import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Persona } from '../clases/persona';
import { Especialista } from '../clases/especialista';

@Injectable({
  providedIn: 'root'
})
// en este service creo todos los usuarios para luego obtenerlos en el login
export class UsuarioService {

  private dbPath = '/usuarios';
  dataUsuarios !: AngularFirestoreCollection<any>;
  listaUsuarios : Observable<any[]>;

  constructor(private afs: AngularFirestore) { 
    this.dataUsuarios = this.afs.collection<any>(this.dbPath);
    this.listaUsuarios = this.dataUsuarios.valueChanges(this.dbPath);
  }

  getEspecialistas(){
    return this.afs.collection(this.dbPath, ref => ref.where('perfil','==', 'especialista')).valueChanges();
  }

  getUsuarios(){
    return this.listaUsuarios;
  }

  guardarPersona(persona : Persona,id : string){
    return this.afs.collection(this.dbPath).doc(id).set(persona);
  }

  habilitarEspecialista(especialista : Especialista){
    if(especialista.emailVerificadoPorAdmin){
      especialista.emailVerificadoPorAdmin = false;
      return this.afs.collection(this.dbPath).doc(especialista.id).update(especialista);
    }else{
      especialista.emailVerificadoPorAdmin = true;
      return this.afs.collection(this.dbPath).doc(especialista.id).update(especialista);
    }
   }

}
