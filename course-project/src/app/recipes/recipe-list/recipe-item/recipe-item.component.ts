import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeModel} from "../../recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe!: RecipeModel
  @Output() recipeSelected = new EventEmitter<void>()

  onRecipeSelected() {
    this.recipeSelected.emit()
  }

}
