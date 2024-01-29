import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  constructor(private db: AngularFireDatabase) {}
  
  saveData(categoria: string, tipo: string, data: any): Promise<any> {
    const datoRef = this.db.list(`${categoria}/${tipo}`).push(data);
    return datoRef.then(ref => ref.key); // Ritorna la chiave generata da Firebase
  }
  
  getDatiByCategoriaTipo(categoria: string, tipo: string) {
    return this.db.list<any>(`${categoria}/${tipo}`).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => ({ id: action.key, ...action.payload.val() }));
      })
      );
    }
    
    deleteDato(categoria: string, tipo: string, datoId: string): Promise<void> {
      const datoRef = this.db.object(`${categoria}/${tipo}/${datoId}`);
      return datoRef.remove();
    }
    
    
    updateDato(categoria: string, tipo: string, datoId: string, modifiche: any): Promise<void> {
      const datoRef = this.db.object(`${categoria}/${tipo}/${datoId}`);
      return datoRef.update(modifiche);
    }
    
    deleteRecensione(recensioneId: string): Promise<void> {
      const recensioneRef = this.db.object(`/recensioni/${recensioneId}`);      
      return recensioneRef.remove();
    }
}