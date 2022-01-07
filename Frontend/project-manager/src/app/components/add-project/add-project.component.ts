import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  projectFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.projectFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(4), CustomValidators.notOnlyWhitespace]],
      startDate: ['', Validators.required],
      endDate: [''],
      description: [''],
      images: ['']
    });
  }

  get name() { return this.projectFormGroup.get('name'); }
  get startDate() { return this.projectFormGroup.get('startDate'); }
  get endDate() { return this.projectFormGroup.get('endDate'); }
  get description() { return this.projectFormGroup.get('description'); }

  // checks if required fields have been filed out and marks them if not, otherwise creates a new project
  checkForm() {
    if (this.projectFormGroup.invalid) {
      this.projectFormGroup.markAllAsTouched();
      return;
    }

    this.projectFormGroup.reset();
  }
}