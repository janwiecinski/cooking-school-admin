import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppIngredientsModule } from './ingredients/app.ingredients.module';
import { AppIngredientsComponent } from './ingredients/app.ingredients.component';
import { AppRecipesModule } from './recipes/app.recipes.module';
import { AppRecipesComponent } from './recipes/app.recipes.component';
import { AppAuthorsModule } from './authors/app.authors.module';
import { AppAuthorsComponent } from './authors/app.authors.component';
import { AppSitesModule } from './sites/app.sites.module';
import { AppSitesComponent } from './sites/app.sites.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound';


const appRoutes: Routes = [
  {
    path: 'ingredients',
    component: AppIngredientsComponent,
    data: { title: 'Ingredients List' }
  },
  {
    path: 'recipes',
    component: AppRecipesComponent,
    data: { title: 'Recipes List' }
  },
  {
    path: 'authors',
    component: AppAuthorsComponent,
    data: { title: 'Authors List' }
  },
  {
    path: "policy",
    component: AppSitesComponent,
    data: { title: 'Privace Policy' }
  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({

  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }