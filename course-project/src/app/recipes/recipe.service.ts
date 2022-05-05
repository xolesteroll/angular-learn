import {EventEmitter, Injectable} from "@angular/core";
import {RecipeModel} from "./recipe.model";
import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<RecipeModel>()

  private recipes: RecipeModel[] = [
    new RecipeModel(
      1,
      'A Test Recipe 1',
      'This is simply a test',
      'https://image.shutterstock.com/image-vector/caprese-salad-recipe-step-by-260nw-1201271428.jpg',
      [
        new IngredientModel('Meat', 1),
        new IngredientModel('French Fries', 20),
      ]),
    new RecipeModel(
      2,
      'A Test Recipe 2',
      'This is simply a test',
      'https://www.simplyrecipes.com/thmb/O-rhPnz2V3hdqKFPij8NlwZIKqs=/2376x1584/filters:fill(auto,1)/Simply-Recipes-Quesadilla-LEAD-5-55da42a2a306497c85b1328385e44d85.jpg',
      [
        new IngredientModel('Fat', 3),
        new IngredientModel('Broccoli', 25),
      ])
  ]

  constructor(private slService: ShoppingListService) {
  }

  getRecipes() {
    return [...this.recipes]
  }

  getRecipe(id: number) {
    const recipe = this.recipes.find(
      (s) => {
        return s.id === id;
      }
    );
    console.log(recipe)
    return recipe;
  }

  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.slService.addIngredients(ingredients)
  }
}
