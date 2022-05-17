import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: IngredientModel[]
  private idChangeSub!: Subscription

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients()
    this.idChangeSub = this.slService.ingredientChanged.subscribe(
      (ingredients) => {
        this.ingredients = ingredients
      }
    )
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index)
  }

  ngOnDestroy() {
    this.idChangeSub.unsubscribe()
  }
}
