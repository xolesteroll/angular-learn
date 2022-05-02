import { Component, OnInit } from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10),
    new IngredientModel('Potatoes', 3),
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient)
  }

}
