import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: any
  id!: number

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    // const newRecipe = this.recipeService.getRecipe(1)
    // console.log(newRecipe)
    // this.recipe = newRecipe

    this.route.params
      .subscribe(
        (params: Params) => {
          const recipe = this.recipeService.getRecipe(+params['id'])
          this.recipe = recipe
        }
      )
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

}
