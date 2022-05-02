import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RecipeModel} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter<RecipeModel>()

  recipes: RecipeModel[] = [
    new RecipeModel(
      'A Test Recipe 1',
      'This is simply a test',
      'https://image.shutterstock.com/image-vector/caprese-salad-recipe-step-by-260nw-1201271428.jpg'),
    new RecipeModel(
      'A Test Recipe 2',
      'This is simply a test',
      'https://www.simplyrecipes.com/thmb/O-rhPnz2V3hdqKFPij8NlwZIKqs=/2376x1584/filters:fill(auto,1)/Simply-Recipes-Quesadilla-LEAD-5-55da42a2a306497c85b1328385e44d85.jpg')
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

  onRecipeSelected(selectedRecipe: RecipeModel) {
    this.recipeSelected.emit(selectedRecipe)
  }


}
