import { Injectable } from '@angular/core';

import recipesList from '../assets/recipes.json';

export interface Recipes {
  recipes: Recipe[];
}

export interface Recipe {
  name: string
  img: string
  ingredients: Ingredient[]
  steps: Steps[]
}

export interface Ingredient {
  name: string
  unit: string
  amount: number | null
  required: boolean
  aliases?: string[]
}

export interface Steps {
  number: number
  description: string
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

  getAllRecipes(): Recipe[] {
    return this.cookbook.recipes;
  }

  getRecipeByName(recipeName: string): Recipe | undefined {
    let recipe: Recipe | undefined;

    recipe = this.cookbook.recipes.find(val => val.name == recipeName);

    return recipe;
  }

  matchPossibleIngredients(ingredients: string[]): string[] {
    let possibleIngredients: string[] = [];

    let ingredientsOfRecipe: Ingredient[] = [];

    this.cookbook.recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        ingredientsOfRecipe.push(ingredient);
      });
    });

    ingredients.forEach(matchedIngredientName => {
      ingredientsOfRecipe.forEach(possibleIngredient => {
        if (possibleIngredient.aliases?.includes(matchedIngredientName)) {
          console.log("eriguheiugfe", matchedIngredientName);

          if (!possibleIngredients.includes(possibleIngredient.name)) {
            possibleIngredients.push(possibleIngredient.name);
          }

        }
      })

    });

    return possibleIngredients;
  }
}
