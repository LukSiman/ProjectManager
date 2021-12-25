import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      mainInfo: this.formBuilder.group({
        name: ['', Validators.required, Validators.maxLength(200), Validators.minLength(2)],
        startDate: ['', Validators.required],
        endDate: [''],
        description: [''],
        images: ['']
      })
    });
  }

}
