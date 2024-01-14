// src/app/image.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private capturedImages: string[] = [];

  addImage(image: string): void {
    this.capturedImages.push(image);
  }

  getImages(): string[] {
    return this.capturedImages;
  }
}
