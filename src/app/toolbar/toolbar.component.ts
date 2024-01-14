import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CaptureService } from '../capture.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  captureActive = false;
  ingredientsActive = false;

  constructor(private router: Router, private captureService: CaptureService) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {

      switch (event.url) {
        case "/capture":
          this.captureActive = true;
          this.ingredientsActive = false;
          break;

        case "/ingredients":
          this.ingredientsActive = true;
          this.captureActive = false;

          break;

        default:
          this.ingredientsActive = false;
          this.captureActive = false;
          break;
      }

      this.captureService.invokeCapture(false);
      this.captureService.invokeRecipeGenerator(false);
    })
  }

  redirectToCapture(): void {
    this.router.navigate(['/capture']);
  }

  capturePhoto() {
    this.captureService.invokeCapture(true);
  }

  generateRecipes() {
    this.captureService.invokeRecipeGenerator(true);
  }

}
