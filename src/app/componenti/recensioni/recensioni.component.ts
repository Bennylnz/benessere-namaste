import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/firebase.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.component.html',
  styleUrls: ['./recensioni.component.css']
})
export class RecensioniComponent implements OnInit {
  reviewName: string = '';
  reviewDescription: string = '';
  recensioni: Observable<any[]>;
  reviewStars : number = 0;
  hoverEnabled: boolean = true; // Per impostazione predefinita, l'hover è abilitato  
  starClicked : boolean ;
  mostraTutto: boolean = false;

  constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService , private authService: AuthService ) {}

  ngOnInit() {
    this.recensioni = this.db.list('/recensioni').snapshotChanges()
      .pipe(
        map((recensioni: any[]) => {
          return recensioni.map(r => {
            return { id: r.key, ...r.payload.val() };
          });
        }),
        map((recensioni: any[]) => recensioni.reverse())
      );

    const swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
  }

  isUserLoggedIn() : boolean{
    return this.authService.isLoggedIn; 
  }

  setStars(stars: number) {
    this.reviewStars = stars;
    this.hoverEnabled = false; // Disabilita l'hover solo dopo il clic
    this.starClicked = true; // Imposta a true dopo il clic
  }

  generateStarsArray(stars: number): any[] {
    return Array.from({length: stars}, (_, index) => index + 1);
  }

  hoverStars(stars: number) {
    this.reviewStars = stars;
  }

  resetStars() {
    if (!this.starClicked) {
      return; // Non fare nulla se non è stato fatto alcun clic
    }
    if (!this.hoverEnabled) {
      this.reviewStars = 0; // Ripristina il valore solo se l'hover è disabilitato dopo il clic
    }
  }

  salvaRecensione() {
    // Crea un oggetto con i dati della recensione
    const recensione = {
      name: this.reviewName,
      description: this.reviewDescription,
      reviewStars : this.reviewStars
    };

    // Salva la recensione nel database Firebase
    this.db.list('/recensioni').push(recensione);

    // Resetta i campi dopo il salvataggio
    this.reviewName = '';
    this.reviewDescription = '';
  }

  eliminaRecensione(recensioneId: string) {
    this.firebaseService.deleteRecensione(recensioneId)
      .then(() => console.log('Recensione eliminata con successo'))
      .catch(error => console.error('Errore durante l\'eliminazione della recensione:', error));
  }
}
