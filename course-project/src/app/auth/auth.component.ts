import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public authForm!: FormGroup
  public isLoginMode = true
  public isLoading = false
  public error: string | null = null

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  public onSubmit() {
    if (!this.authForm.valid) {
      return
    }
    const email = this.authForm.value.email
    const password = this.authForm.value.password

    let authObs: Observable<AuthResponseData>

    this.isLoading = true

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe(response => {
      console.log(response)
      this.isLoading = false
      this.router.navigate(['/recipes'])
    }, errorMessage => {
      console.log(errorMessage)
      this.error = errorMessage
      this.isLoading = false
    })

    this.authForm.reset()
  }

  onCloseAlert() {
    this.error = null
  }


}
