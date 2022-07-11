import {Injectable} from "@angular/core";
import {RecipeModel} from "./recipe.model";
import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject()
  private recipes: RecipeModel[] = []
  // private recipes: RecipeModel[] = [
  //   new RecipeModel(
  //     1,
  //     'A Test Recipe 1',
  //     'This is simply a test1231231',
  //     'https://image.shutterstock.com/image-vector/caprese-salad-recipe-step-by-260nw-1201271428.jpg',
  //     [
  //       new IngredientModel(1, 'Meat', 1),
  //       new IngredientModel(2, 'French Fries', 20),
  //     ]),
  //   new RecipeModel(
  //     2,
  //     'A Test Recipe 2',
  //     'This is simply a test12312',
  //     'https://www.simplyrecipes.com/thmb/O-rhPnz2V3hdqKFPij8NlwZIKqs=/2376x1584/filters:fill(auto,1)/Simply-Recipes-Quesadilla-LEAD-5-55da42a2a306497c85b1328385e44d85.jpg',
  //     [
  //       new IngredientModel(1, 'Fat', 3),
  //       new IngredientModel(2, 'Broccoli', 25),
  //     ])
  // ]

  constructor(private slService: ShoppingListService) {
  }

  getRecipes() {
    return [...this.recipes]
  }

  setRecipes(recipes: RecipeModel[]) {
    this.recipes = recipes
    this.recipesChanged.next([...recipes])
  }

  getRecipe(id: number) {
    const recipe = this.recipes.find(
      (s) => {
        return s.id === id;
      }
    );
    return recipe;
  }

  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.slService.addIngredients(ingredients)
  }

  deleteIngredient(recipeId: number, ingredientId: number) {
    const recipe = this.recipes.find(e => e.id === recipeId)
    if (recipe) {
      recipe.ingredients = recipe.ingredients.filter(i => i.id !== ingredientId)
    }
  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe)
    this.recipesChanged.next([...this.recipes])
  }

  updateRecipe(index: number, newRecipe: RecipeModel) {
    // @ts-ignore
    const newRecipes = this.recipes.map(e => {
      if (e.id === index) {
        return {...newRecipe}
      }
      return e
    })
    this.recipes = newRecipes
    this.recipesChanged.next(newRecipes)
  }

  deleteRecipe(id: number) {
    const updatedRecipes = this.recipes.filter(e => e.id !== id)

    this.recipes = updatedRecipes
    this.recipesChanged.next(this.recipes)
  }


}
