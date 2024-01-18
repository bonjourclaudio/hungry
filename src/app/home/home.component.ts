import { Component } from '@angular/core';
import { Recipe, RecipeMatcherService } from '../recipe-matcher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  allRecipes: Recipe[] | undefined;

  constructor(recipeMatcher: RecipeMatcherService, private router: Router) {
    this.allRecipes = recipeMatcher.getAllRecipes();
  }

  openRecipe(recipeName: string): void {
    this.router.navigate(['/recipe', recipeName]);
  }

}
