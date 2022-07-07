import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IngredientModel} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

import {CustomValidators} from "../../shared/custom-validators";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput') nameInput!: ElementRef
  // @ViewChild('amountInput') amountInput!: ElementRef
  ingredientForm!: FormGroup
  subscription!: Subscription
  editMode: boolean = false
  editedItemIndex!: number
  editingItem!: IngredientModel

  constructor(private slService: ShoppingListService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.ingredientForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: [null, [Validators.required, CustomValidators.numbersRange(0, 99)]]
    })

    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index
        this.editMode = true
        this.editingItem = this.slService.getIngredient(index)
        this.ingredientForm.setValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount
        })
      }
    )
  }

  onAddItem() {
    const ingredientsLength = this.slService.getIngredients().length
    const ingName = this.ingredientForm.get('name')?.value
    const ingAmount = this.ingredientForm.get('amount')?.value
    const newIngredient = new IngredientModel(ingredientsLength + 1, ingName, ingAmount)

    this.editMode ?
      this.slService.updateIngredient(this.editedItemIndex, newIngredient) :
      this.slService.addIngredient(newIngredient)

    this.editMode = false
    this.ingredientForm.reset()
  }

  onDeleteItem(index: number) {
    this.slService.deleteIngredient(index)
    this.onClearForm()
    console.log(this.slService.getIngredients())
  }

  onClearForm() {
    this.editMode = false
    this.ingredientForm.reset()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
