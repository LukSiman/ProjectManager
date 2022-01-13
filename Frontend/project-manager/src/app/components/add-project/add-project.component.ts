import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/entities/project';
import { ProjectService } from 'src/app/services/project.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  projectFormGroup: FormGroup;

  private resId: number;
  private resName: string;
  private resStartDate: Date;
  private resEndDate: Date;
  private resLength: number;
  private resDescription: string;
  private resImages: [];

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(4), CustomValidators.notOnlyWhitespace]],
      startDate: ['', Validators.required],
      endDate: [''],
      description: [''],
      images: ['']
    }, { validators: CustomValidators.endDateAfterStartDate });
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
    
    this.addNewProject();

    this.projectFormGroup.reset();
  }

  // add a new project
  private addNewProject(){
    const newProject: Project = {
      id: 0,
      name: this.name?.value,
      startDate: this.startDate?.value,
      endDate: this.endDate?.value,
      length: 0,
      description: this.description?.value,
      images: []
    };

    this.projectService.addProject(newProject).subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      this.resId = data.id,
      this.resName = data.id,
      this.resStartDate = data.id,
      this.resEndDate = data.id,
      this.resLength = data.id,
      this.resDescription = data.id,
      this.resImages = data.id;
    }
  }

}