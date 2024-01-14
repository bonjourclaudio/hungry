import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebcamComponent } from './webcam/webcam.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import { CaptureComponent } from './capture/capture.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipeIdeasComponent } from './recipe-ideas/recipe-ideas.component';


@NgModule({
  declarations: [
    AppComponent,
    WebcamComponent,
    NavComponent,
    ToolbarComponent,
    HomeComponent,
    CaptureComponent,
    IngredientsComponent,
    RecipeIdeasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
