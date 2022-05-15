import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms';

import {Customer} from './customer';
import {debounceTime} from "rxjs/operators";

const ratingRange = (min: number, max: number): ValidatorFn => {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return {'range': true}
    }
    return null
  }
}

const emailMatch = (c: AbstractControl): { [key: string]: boolean } | null => {
  const email = c.get('email')
  const confirmEmail = c.get('confirmEmail')

  if (email.pristine || confirmEmail.pristine) {
    return null
  }

  if (email.value === confirmEmail.value) {
    return null
  }
  return {'match': true}
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer = new Customer();
  customerForm!: FormGroup;
  emailMessage: string;

  private validationMessages = {
    required: 'Please enter your email address',
    email: 'Please enter a valid email address'
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]],
      }, {validators: emailMatch}),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 10)],
      sendCatalog: true
    })

    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true)
    // })

    // console.log(this.customerForm)
    // this.customerForm.statusChanges.subscribe(
    //   (status) => console.log(this.customerForm.get('lastName'))
    // );
    //
    // this.customerForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );

    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    )

    const emailControl = this.customerForm.get('emailGroup.email')
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    )
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = ''
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ')
    }
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'jack',
      lastName: 'huidodirius',
      sendCatalog: false
    })
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone')
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required)
    } else {
      phoneControl.clearValidators()
    }
    phoneControl.updateValueAndValidity()
  }

}

