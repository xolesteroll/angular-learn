import {AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomValidators {
  static numbersRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
        if(c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
          return {'range': true}
        }
        return null
    }
  }
}
