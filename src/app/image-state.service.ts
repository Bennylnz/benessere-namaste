// image-state.service.ts

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageStateService {
  private imageUrlKey = 'image-url';

  constructor(private db: AngularFireDatabase) {}

  getImageUrl(): Observable<string | null> {
    return this.db.object<string>(this.imageUrlKey).valueChanges();
  }

  setImageUrl(url: string): void {
    this.db.object(this.imageUrlKey).set(url);
  }
}
