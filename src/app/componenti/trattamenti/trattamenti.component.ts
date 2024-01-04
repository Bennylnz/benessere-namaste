import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../firebase.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-trattamenti',
  templateUrl: './trattamenti.component.html',
  styleUrls: ['./trattamenti.component.css']
})
export class TrattamentiComponent implements OnInit {
  categoria: string;
  tipo: string;
  dati: any[] = [];
  

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private authService: AuthService 
  ) {}
  isUserLoggedIn() : boolean{
    return this.authService.isLoggedIn; 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoria = params.get('categoria');
      this.tipo = params.get('tipo');
      this.caricaDati();      
    });
  }

  caricaDati() {
    this.firebaseService.getDatiByCategoriaTipo(this.categoria, this.tipo).subscribe((dati) => {    
      this.dati = dati.map(item => {
        return { id: item.$key, ...item }; // Aggiungi l'ID generato da Firebase alle proprietà dell'oggetto
      });      
      console.log('Dati mappati con ID:', this.dati);
    });
  }
  

  eliminaDato(datoId: string) {
    this.firebaseService.deleteDato(this.categoria, this.tipo, datoId)
      .then(() => {
        console.log('Dato eliminato con successo');
        // Aggiorna i dati dopo l'eliminazione se necessario
        this.caricaDati();
      })
      .catch(error => console.error('Errore ', error));
  }

  modificaDato(datoId: string) {
    const nuovoNome = prompt('Inserisci il nuovo nome:');
    const nuovoPrezzoStr = prompt('Inserisci il nuovo prezzo:');
    
    if (nuovoNome !== null && nuovoPrezzoStr !== null) {
      const nuovoPrezzo = parseFloat(nuovoPrezzoStr);
      
      if (!isNaN(nuovoPrezzo)) {
        // Chiamare il servizio Firebase per aggiornare i dati
        this.firebaseService.updateDato(this.categoria, this.tipo, datoId, {
          nome: nuovoNome,
          prezzo: nuovoPrezzo
        }).then(() => {
          console.log('Dato aggiornato con successo');
          // Aggiornare i dati dopo la modifica se necessario
          this.caricaDati();
        }).catch(error => console.error('Errore durante l\'aggiornamento del dato:', error));
      } else {
        console.error('Il prezzo inserito non è valido.');
      }
    }
  }
}
