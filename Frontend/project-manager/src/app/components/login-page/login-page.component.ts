import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
    // navigate to main screen if already logged in
    if(this.authentication.isUserLoggedIn()){
      this.router.navigateByUrl('');
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  // checks and marks required fields
  checkForm(): void {
    // required field check
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.login();
  }

  // calls authentication service for authentication
  private login(): void {
    this.authentication.authenticate(this.username?.value, this.password?.value).subscribe(() => {
      this.router.navigateByUrl('');
    }, (error: string) => {
      this.errorMessage = error;
    });
  }
}