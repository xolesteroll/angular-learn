import {EventEmitter} from "@angular/core";
import {IngredientModel} from "../shared/ingredient.model";

export class ShoppingListService {
  ingredientChanged = new EventEmitter<IngredientModel[]>()
  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10),
    new IngredientModel('Potatoes', 3),
  ]

  getIngredients() {
    return [...this.ingredients]
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient)
    this.ingredientChanged.emit([...this.ingredients])
  }

  addIngredients(ingredients: IngredientModel[]) {
    this.ingredients.push(...ingredients)
    this.ingredientChanged.emit([...this.ingredients])
  }
}
