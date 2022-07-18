import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module')
      .then(m => m.RecipesModule)
  },
  {
    path: 'shopping',
    loadChildren: () => import('./shopping-list/shopping-list.module')
      .then(m => m.ShoppingListModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      // Config to preload all lazy loaded module after initial load
      {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
