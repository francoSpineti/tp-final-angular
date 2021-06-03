import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HorariosEspecialistas } from '../clases/horarios-especialistas';

@Injectable({
  providedIn: 'root'
})
export class HorariosEspecialistasService {

  private dbPath = '/horarios-especialistas';
  data !: AngularFirestoreCollection<any>;
  lista : Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.data = this.afs.collection<any>(this.dbPath);
    this.lista = this.data.valueChanges(this.dbPath); 
  }

  getHorariosPorEmail(email : string){
    return this.afs.collection(this.dbPath, ref => ref.where('email','==', email)).valueChanges();
  }

  guardarHorarios(horariosEspecialistas : HorariosEspecialistas){
    const id = this.afs.createId();
    horariosEspecialistas.id = id;
    return this.afs.collection(this.dbPath).doc(id).set(horariosEspecialistas);
  }

  modificarHorarios(horariosEspecialistas : HorariosEspecialistas){
    return this.afs.collection(this.dbPath).doc(horariosEspecialistas.id).update(horariosEspecialistas);
  }

}
