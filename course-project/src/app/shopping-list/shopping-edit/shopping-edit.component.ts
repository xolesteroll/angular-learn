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
      }
    )
  }

  onAddIngredient() {
    // const ingName = this.nameInput.nativeElement.value
    // const ingAmount = this.amountInput.nativeElement.value
    // const newIngredient = new IngredientModel(ingName, ingAmount)
    // this.slService.addIngredient(newIngredient)
  }

  onAddItem() {
    const ingName = this.ingredientForm.get('name')?.value
    const ingAmount = this.ingredientForm.get('amount')?.value
    const newIngredient = new IngredientModel(ingName, ingAmount)

    this.slService.addIngredient(newIngredient)
    this.ingredientForm.reset()
  }

  onClearForm() {
    this.ingredientForm.reset()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
