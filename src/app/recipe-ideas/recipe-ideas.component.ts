import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe, RecipeMatcherService } from '../recipe-matcher.service';

@Component({
  selector: 'app-recipe-ideas',
  templateUrl: './recipe-ideas.component.html',
  styleUrls: ['./recipe-ideas.component.scss']
})
export class RecipeIdeasComponent {
  recipes: Recipe[] = [];

  constructor(private router: Router, private recipeMatcher: RecipeMatcherService) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation) {
      const state = navigation.extras.state;

      this.recipes = this.generateRecipes(state?.['ingredients']);
    }
  }

  generateRecipes(ingredients: string[]): Recipe[] {
    return this.recipeMatcher.checkRecipes(ingredients)
  }

  openRecipe(recipeName: string): void {
    this.router.navigate(['/recipe', recipeName]);
  }

}
