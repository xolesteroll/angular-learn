import {Component, OnDestroy, OnInit} from '@angular/core';
import { RecipeService } from '../recipe.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit, OnDestroy {
  public recipesExist!: boolean
  private recipesSub!: Subscription
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipesExist = this.recipeService.getRecipes().length > 0
    this.recipesSub = this.recipeService.recipesChanged
      .subscribe(
        recipes => {
          this.recipesExist = recipes.length > 0
        }
      )
  }

  ngOnDestroy() {
    this.recipesSub.unsubscribe()
  }

}
