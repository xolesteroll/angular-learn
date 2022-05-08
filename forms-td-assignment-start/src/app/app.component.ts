import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') loginForm: HTMLFormElement;
  submitted = false;
  defaultSubscription = 'Advanced';
  data = {
    email: '',
    password: '',
    subscription: ''
  };

  onSubmit() {
    this.data.email = this.loginForm.value.email;
    this.data.password = this.loginForm.value.password;
    this.data.subscription = this.loginForm.value.subscription;

    this.submitted = true;

    this.loginForm.reset();

    this.loginForm.form.patchValue({
      subscription: this.defaultSubscription
    })
  };
}
