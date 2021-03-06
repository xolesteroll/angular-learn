import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeModel} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  public storeRecipes() {
    const recipes = this.recipeService.getRecipes()
    this.http.put(
      'https://recipes-project-1aeb9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    )
      .subscribe(res => {
        console.log(res)
      })
  }

  public fetchRecipes() {

    return this.http.get<RecipeModel[]>(
      'https://recipes-project-1aeb9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    ).pipe(
      map(recipes => {
        return recipes.map(r => {
          if (!r.ingredients) {
            return {...r, ingredients: []}
          }
          return r
        })
      }),
      tap(recipes => {
        this.recipeService.setRecipes(<RecipeModel[]>recipes);
      })
    )
  }
}
