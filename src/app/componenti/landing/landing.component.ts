// landing.component.ts

import { Component, OnInit } from '@angular/core';
import { ImageStateService } from '../../image-state.service';
import AOS from 'aos';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  isUploading: boolean = false;
  imageUrl: string | null = null;

  constructor(private imageStateService: ImageStateService , private authService: AuthService) {}

  ngOnInit() {
    AOS.init({
      once: false,
      mirror: true,
    });

    this.imageStateService.getImageUrl().subscribe((url) => {
      this.imageUrl = url;
    });
  }


  isUserLoggedIn() : boolean{
    return this.authService.isLoggedIn; 
  }
  onImageUploaded(url: string) {
    this.isUploading = true;

    // Delay per garantire che l'immagine sia stata caricata completamente
    setTimeout(() => {
      this.isUploading = false;
    }, 1000);
  }

  deleteImage() {
    if (this.imageUrl) {
      // Elimina l'immagine dal database
      this.imageStateService.setImageUrl(null);
    }
  }
}
