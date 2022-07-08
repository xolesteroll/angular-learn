import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from "@angular/router";
import { CustomValidators } from 'src/app/shared/custom-validators';
import { RecipeModel } from '../recipe.model';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number
  editMode: boolean = false
  recipeForm!: FormGroup

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.editMode = !!params['id']
      this.initForm()
    })
  }

  private initForm() {
    let recipeName = ''
    let recipeImagePath = ''
    let recipeDescription = ''
    let recipeIngredients = this.fb.array([])

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe!.name
      recipeImagePath = recipe!.imagePath
      recipeDescription = recipe!.description
      if (recipe && recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            this.fb.group({
              id: [ingredient.id],
              name: [ingredient.name, Validators.required],
              amount: [ingredient.amount, [Validators.required, CustomValidators.numbersRange(0, 99)]]
            })
          )
        }
      }
    }

    this.recipeForm = this.fb.group({
      name: [recipeName, [Validators.required]],
      imagePath: [recipeImagePath, [Validators.required]],
      description: [recipeDescription, [Validators.required]],
      ingredients: recipeIngredients
    })

  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.fb.group({
        name: ['', Validators.required],
        amount: [null, [Validators.required, CustomValidators.numbersRange(0, 99)]]
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onSubmit() {
    const recipesLength = this.recipeService.getRecipes().length

    const recipe = new RecipeModel(
      this.editMode ? this.id : recipesLength + 1,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    )
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe)
    } else {
      this.recipeService.addRecipe(recipe)
    }

    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

}
