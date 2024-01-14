import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CaptureComponent } from './capture/capture.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipeIdeasComponent } from './recipe-ideas/recipe-ideas.component';

const routes: Routes = [
  {
    "path": "",
    component: HomeComponent
  },
  {
    path: "capture",
    component: CaptureComponent
  },
  {
    path: "ingredients",
    component: IngredientsComponent
  },
  {
    path: "recipe-ideas",
    component: RecipeIdeasComponent
  },
  {
    path: "**",
    redirectTo: "/"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
