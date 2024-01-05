import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import AOS from "aos";
import { take } from 'rxjs';
import { FirebaseService } from 'src/app/firebase.service';
import { AuthService } from 'src/app/shared/services/auth.service';




@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(private firebaseService: FirebaseService, private storage: AngularFireStorage, private authService: AuthService ) {}
  
  ngOnInit(){

    AOS.init({
      once: false, // whether animation should happen only once - while scrolling down
      mirror: true, // whether elements should animate out while scrolling past them
    });
    this.loadImage();
}

isUserLoggedIn() : boolean{
  return this.authService.isLoggedIn; 
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0] as File;
}

uploadFile() {
  if (this.selectedFile) {
    // Carica il file su Firestore Storage
    const filePath = `uploads/${Date.now()}_${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);

    // Ottieni l'URL del file appena caricato
    task.snapshotChanges().subscribe((snapshot) => {
      if (snapshot.state === 'success') {
        fileRef.getDownloadURL().subscribe((downloadURL) => {
          // Salva l'URL del file nel database sovrascrivendo l'immagine precedente
          this.firebaseService.saveData('immagini', 'foto', { url: downloadURL })
            .then(() => {
              console.log('File caricato con successo.');
              // Ricarica l'immagine dopo il caricamento del file
              this.loadImage();

              // Reimposta l'input del file
              if (this.fileInput) {
                this.fileInput.nativeElement.value = null;
              }
            })
            .catch((error) => {
              console.error('Errore durante il caricamento del file:', error);
            });
        });
      }
    });
  }
}


loadImage() {
  // Ottieni l'URL dell'immagine dal servizio Firebase
  this.firebaseService.getDatiByCategoriaTipo('immagini', 'foto').subscribe((data) => {
    if (data && data.length > 0) {
      // Usa il primo URL dell'immagine trovato (puoi adattare questo comportamento in base alle tue esigenze)
      this.imageUrl = data[0].url;
    }
  });
}

deleteImage() {
  // Chiamata al servizio Firebase per eliminare l'immagine corrente
  this.firebaseService.getDatiByCategoriaTipo('immagini', 'foto').pipe(take(1)).subscribe((data) => {
    if (data && data.length > 0) {
      const immagineDaEliminare = data[0];
      this.firebaseService.deleteDato('immagini', 'foto', immagineDaEliminare.id)
        .then(() => {
          console.log('Immagine eliminata con successo.');
          // Aggiorna l'URL dell'immagine nel componente solo dopo l'eliminazione
          this.imageUrl = null;
        })
        .catch((error) => {
          console.error('Errore durante l\'eliminazione dell\'immagine:', error);
        });
    }
  });
}
}