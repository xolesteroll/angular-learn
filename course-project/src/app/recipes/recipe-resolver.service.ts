import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {RecipeModel} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {Observable} from "rxjs";
import {RecipeService} from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<RecipeModel[]> {
  constructor(private dataStorageService: DataStorageService,
              private recipesService: RecipeService) {
  }
  // Resolve the request on route load
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeModel[]> | Promise<RecipeModel[]> | RecipeModel[] {
    // Resolver subscribes to http observable automatically
    const existingRecipes = this.recipesService.getRecipes()
    if (existingRecipes.length === 0) {
      return this.dataStorageService.fetchRecipes()
    }
    return  existingRecipes
  }
}
