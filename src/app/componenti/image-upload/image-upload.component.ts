import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageStateService } from '../../image-state.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent {
  @Output() imageUploaded = new EventEmitter<string>();
  selectedImage: File | null = null;
  isUploading: boolean = false;

  constructor(
    private storage: AngularFireStorage,
    private imageStateService: ImageStateService
  ) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  uploadImage() {
    if (this.selectedImage && !this.isUploading) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const base64Image = event.target.result;

        this.imageStateService.setImageUrl(base64Image);
        this.imageUploaded.emit(base64Image);
      };

      reader.readAsDataURL(this.selectedImage);
    }
  }
}
