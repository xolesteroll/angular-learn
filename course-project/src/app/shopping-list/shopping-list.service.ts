import {IngredientModel} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {
  ingredientChanged = new Subject<IngredientModel[]>()
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
    this.ingredientChanged.next([...this.ingredients])
  }

  addIngredients(ingredients: IngredientModel[]) {
    this.ingredients.push(...ingredients)
    this.ingredientChanged.next([...this.ingredients])
  }
}
