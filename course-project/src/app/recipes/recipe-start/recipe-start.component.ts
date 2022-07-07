import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {
  recipesExist!: boolean
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    const recipes = this.recipeService.getRecipes()
    this.recipesExist = recipes.length > 0 ? true : false
  }

}
