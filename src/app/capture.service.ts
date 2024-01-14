import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaptureService {
  private captureSource = new BehaviorSubject(false);
  currentCapture = this.captureSource.asObservable();

  private recipeGeneratorSource = new BehaviorSubject(false);
  currentRecipeGenerator = this.recipeGeneratorSource.asObservable();

  constructor() { }

  invokeCapture(value: boolean) {
    this.captureSource.next(value)
  }

  invokeRecipeGenerator(value: boolean) {
    this.recipeGeneratorSource.next(value);
  }
}
