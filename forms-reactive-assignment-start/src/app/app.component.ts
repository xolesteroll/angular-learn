import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

const customValidator = (...prohibitedWords: string[]): ValidatorFn => {
  return (c: AbstractControl): {[key: string]: boolean} | null => {
    if (prohibitedWords.includes(c.value)) {
      return {'text': true};
    }
    return null;
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  constructor(public fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      projectName: ['', [Validators.required, customValidator('Test', 'mama', 'number')]],
      email: ['', [Validators.required, Validators.email]],
      status: 'stable'
    });
    console.log(this.form);
    this.form.valueChanges.subscribe(
      value => console.log(this.form)
    );
  }
  save() {
    console.log(this.form.value);
  }

}
