import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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

  private registerNewUser(){
    
  }
}
