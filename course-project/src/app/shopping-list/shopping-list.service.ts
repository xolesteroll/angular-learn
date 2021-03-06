import {IngredientModel} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {
  ingredientChanged = new Subject<IngredientModel[]>()
  startedEditing = new Subject<number>()
  private ingredients: IngredientModel[] = []

  getIngredients() {
    return [...this.ingredients]
  }

  getIngredient(index: number) {
    return this.ingredients[index]
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient)
    this.ingredientChanged.next([...this.ingredients])
  }

  addIngredients(ingredients: IngredientModel[]) {
    this.ingredients.push(...ingredients)
    this.ingredientChanged.next([...this.ingredients])
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1)
    // this.ingredients = this.ingredients.filter((ing, i) => i !== index)
    this.ingredientChanged.next([...this.ingredients])
  }


  updateIngredient(index: number, newIngredient: IngredientModel) {
    this.ingredients[index] = newIngredient
    this.ingredientChanged.next([...this.ingredients])
  }
}
