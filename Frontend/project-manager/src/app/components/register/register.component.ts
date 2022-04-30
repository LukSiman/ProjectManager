import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), CustomValidators.notOnlyWhitespace]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), CustomValidators.notOnlyWhitespace]],
      repeatPassword: ['']
    }, { validators: CustomValidators.samePassword });
  }

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get repeatPassword() { return this.registerForm.get('repeatPassword'); }

  // checks and marks required fields
  checkForm(): void {
    // required field check
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.registerNewUser();
  }

  private registerNewUser() {
    const newUser: User = {
      username: this.username?.value,
      password: this.password?.value
    };

    // call service to add new user
    return this.userService.addNewUser(newUser).subscribe(() => {
      this.errorMessage = '';
      this.successMessage = 'Success! Redirecting to login page...';
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 3000);
    }, (error) => {
      this.errorMessage = error;
    });
  }
}