import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe, RecipeMatcherService } from '../recipe-matcher.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  private recipeName: string | null = "";
  recipe: Recipe | undefined;

  constructor(private _Activatedroute: ActivatedRoute, private recipeMatcher: RecipeMatcherService) {
    this.recipeName = this._Activatedroute.snapshot.paramMap.get("name");

    if (this.recipeName) {
      this.recipe = this.recipeMatcher.getRecipeByName(this.recipeName);
    }
  }
}
