import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin = false //TODO: DELETE LATER

  constructor(private formBuilder: FormBuilder, private router: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
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

  private login(): void {
    this.authentication.authenticate(this.username?.value, this.password?.value).subscribe(data => {
      this.router.navigateByUrl('');
      this.invalidLogin = false;
    }, error => {
      console.log(error);
      this.invalidLogin = true;
    });
  }
}