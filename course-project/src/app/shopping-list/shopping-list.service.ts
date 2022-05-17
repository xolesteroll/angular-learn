import {IngredientModel} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {
  ingredientChanged = new Subject<IngredientModel[]>()
  startedEditing = new Subject<number>()
  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10),
    new IngredientModel('Potatoes', 3),
  ]

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
    this.ingredients = this.ingredients.filter((ing, i) => i !== index)
  }


  updateIngredient(index: number, newIngredient: IngredientModel) {
    this.ingredients[index] = newIngredient
    this.ingredientChanged.next([...this.ingredients])
  }
}
