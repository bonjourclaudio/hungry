import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RecipeMatcherService } from '../recipe-matcher.service';
import { CaptureService } from '../capture.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent {
  ingredients: string[] = [];

  constructor(
    private router: Router,
    private recipeMatcher: RecipeMatcherService,
    private captureService: CaptureService
  ) {

    const navigation = this.router.getCurrentNavigation();

    if (navigation) {
      const state = navigation.extras.state;

      this.ingredients = state?.['ingredients'];
    }

    this.captureService.currentRecipeGenerator.subscribe(state => {
      if (state === true) {
        this.generateRecipeIdeas();
      }
    })

  }

  addIngredient(value: string): void {
    this.ingredients.unshift(value);
  }

  generateRecipeIdeas() {

    const state: NavigationExtras = {
      state: {
        ingredients: this.ingredients
      }
    };

    this.router.navigate(['/recipe-ideas'], state);
  }
}
