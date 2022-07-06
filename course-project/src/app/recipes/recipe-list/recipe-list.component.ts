import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes!: RecipeModel[]

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipeService.recipesChanged
      .subscribe(
        (recipes) => {
          this.recipes = recipes
        }
      )
    this.recipes = this.recipeService.getRecipes()
  }


}
