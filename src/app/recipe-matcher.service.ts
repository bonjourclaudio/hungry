import { Injectable } from '@angular/core';

import recipesList from '../assets/recipes.json';

export interface Recipes {
  recipes: Recipe[];
}

export interface Recipe {
  name: string
  ingredients: Ingredient[]
}

export interface Ingredient {
  name: string
  required: boolean
  aliases?: string[]
}


@Injectable({
  providedIn: 'root'
})
export class RecipeMatcherService {
  cookbook: Recipes = recipesList;

  constructor() { }

  checkRecipes(foods: string[]): Recipe[] {
    let possibleRecipes: Recipe[] = [];

    this.cookbook.recipes.forEach(recipe => {
      const missingIngredients = recipe.ingredients
        .filter((ingredient) => ingredient.required)
        .filter((ingredient) => !this.labelsContainIngredient(foods, ingredient));

      if (missingIngredients.length === 0) {
        possibleRecipes.push(recipe);
      }
    });

    return possibleRecipes;

  }

  labelsContainIngredient(detectedLabels: string[], ingredient: any): boolean {
    const aliases = ingredient.aliases || [];
    return aliases.some((alias: any) => detectedLabels.includes(alias.toLowerCase()));
  }
}
