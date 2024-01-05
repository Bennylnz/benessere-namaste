import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/firebase.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  dataForm: FormGroup;
  categorie: string[] = ['Estetica uomo', 'Estetica donna' , 'Parruccheria' , 'Barberia' , "Consulenza d'immagine"];
  trattamentiUomo: string[] = ['', 'Viso', 'Epilazione Uomo', 'Laser Uomo', 'Mani e Piedi'];
  trattamentiDonna: string[] = ['' ,'Trattamenti Corpo', 'Laser', 'Trucco Semipermanente', 'Sopracciglia e Ciglia', 'Make-Up', 'Nails', 'Pedicure' ];
  serviziParruccheria: string[] = ['', 'Servizio Styling', 'Servizio Tecnico', 'Servizio Sposa', 'Servizio Trattamenti'];
  serviziBarberia: string[] = ['', 'Servizio Styling', 'Servizio Tecnico', 'Servizio Sposo', 'Servizio Trattamenti'];
  epilazione: string[] = [ 'Cera Classica', 'Cera Brasiliana'];
  consulenzaImmagine: string[] = [ 'Armocromia'];
  


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.dataForm = this.fb.group({
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
      nome: ['', Validators.required],
      prezzo: ['', Validators.required],
    });
  }

  onCategoriaChange() {
    const categoriaValue = this.dataForm.get('categoria').value;
    // Aggiorna le opzioni del secondo select in base alla categoria selezionata
    if (categoriaValue === 'Estetica uomo') {
      this.dataForm.get('tipo').setValue('');  // Resetta il valore del secondo select
    }
  }


  saveData() {
    const categoria = this.dataForm.get('categoria').value;
    const tipo = this.dataForm.get('tipo').value;
    const data = { ...this.dataForm.value };
    this.firebaseService.saveData(categoria, tipo, data);
  }  
}