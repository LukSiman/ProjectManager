import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/entities/project';
import { ProjectService } from 'src/app/services/project.service';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { environment } from 'src/environments/environment';

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

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService, private http: HttpClient) { }

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
  get images() { return this.projectFormGroup.get('images'); }

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
  private addNewProject() {
    const newProject: Project = {
      id: 0,
      name: this.name?.value,
      startDate: this.startDate?.value,
      endDate: this.endDate?.value,
      length: 0,
      description: this.description?.value,
      // images: [this.images?.value]
      images: []
    };

    console.log('Images value: ' + this.images?.value);
    console.log('Images value array: ' + [this.images?.value]);

    //this.projectService.addProject(newProject).subscribe(this.processResult());
    this.projectService.addProject(newProject).subscribe(res => console.log(res));
  }

  processResult() {
    return (data: any) => {
      this.resId = data.id,
        this.resName = data.name,
        this.resStartDate = data.startDate,
        this.resEndDate = data.endDate,
        this.resLength = data.length,
        this.resDescription = data.description,
        this.resImages = data.images;
    }
  }


  selectedFile: File;

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  OnUpload() {
    //Upload file here send a binary data
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);

    console.log(`selected file: ${this.selectedFile}`);

    console.log(`selected file name: ${this.selectedFile.name}`);

    console.log(`form data: ${formData}`);


    /*  this.http.post(environment.springUrl + "/projects/save", this.selectedFile)
        .subscribe(response => console.log(response));*/
  }

}