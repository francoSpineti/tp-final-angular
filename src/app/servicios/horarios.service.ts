import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private dbPath = '/horarios';
  data !: AngularFirestoreCollection<any>;
  listaHorarios : Observable<any[]>;

  constructor(private afs: AngularFirestore) { 
    this.data = this.afs.collection<any>(this.dbPath);
    this.listaHorarios = this.data.valueChanges(this.dbPath); 
  }

  getHorarios(){
    return this.listaHorarios;
  }

}
