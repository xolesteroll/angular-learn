import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {IngredientModel} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput!: ElementRef
  @ViewChild('amountInput') amountInput!: ElementRef

  @Output() ingredientAdded = new EventEmitter<IngredientModel>()

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient() {
    const ingName = this.nameInput.nativeElement.value
    const ingAmount = this.amountInput.nativeElement.value

    const newIngredient = new IngredientModel(ingName, ingAmount)

    this.ingredientAdded.emit(newIngredient)
  }

}
