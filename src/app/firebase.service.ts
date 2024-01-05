import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) {}

  saveData(categoria: string, tipo: string, data: any): Promise<any> {
    // Elimina tutte le immagini precedenti prima di aggiungere la nuova
    return this.getDatiByCategoriaTipo(categoria, tipo).pipe(take(1)).toPromise().then((immaginiPrecedenti) => {
      immaginiPrecedenti.forEach((immagine) => {
        this.deleteDato(categoria, tipo, immagine.id);
      });
      
      // Aggiungi la nuova immagine
      const datoRef = this.db.list(`${categoria}/${tipo}`).push(data);
      return datoRef.then(ref => ref.key);
    });
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
    
    // Ritorna la promessa dopo l'eliminazione
    return datoRef.remove().then(() => {});
  }


  updateDato(categoria: string, tipo: string, datoId: string, modifiche: any): Promise<void> {
    const datoRef = this.db.object(`${categoria}/${tipo}/${datoId}`);
    
    return datoRef.update(modifiche);
  }
}
