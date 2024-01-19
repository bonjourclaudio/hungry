// src/app/webcam/webcam.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil, WebcamComponent as NgxWebcamComponent } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ImageDetectionService } from '../image-detection.service';
import { Recipe, RecipeMatcherService } from '../recipe-matcher.service';
import { CaptureService } from '../capture.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
})
export class WebcamComponent implements OnInit {
  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();

  sysImage = '';
  possibleRecipes: Recipe[] | any;

  constructor(private imageDetectionService: ImageDetectionService,
    private recipeMatcher: RecipeMatcherService, private captureService: CaptureService,
    private router: Router) {
    this.captureService.currentCapture.subscribe(data => {
      if (data == true) {
        this.getSnapshot();
      }
    })
  }

  ngOnInit() {

  }

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;

    this.imageDetectionService.detectLabels(this.sysImage).subscribe(
      (response) => {

        let ingredients = this.recipeMatcher.matchPossibleIngredients(response);

        const state: NavigationExtras = {
          state: {
            ingredients: ingredients
          }
        };

        this.router.navigate(['/ingredients'], state);

      },
      (error) => {
        console.error('Error detecting foods:', error);
        // Handle errors
      }
    );
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }
}