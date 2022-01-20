import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/entities/project';
import { ProjectImages } from 'src/app/entities/project-images';
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
  private selectedFile: File;

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

  // informs user of required fields and initiates project adding
  checkForm() {
    if (this.projectFormGroup.invalid) {
      this.projectFormGroup.markAllAsTouched();
      return;
    }

    console.log('selected file ' + this.selectedFile);
    console.log('selected file name' + this.selectedFile.name);
    console.log('selected file type' + typeof this.selectedFile);

    // checks if file was selected
    if(this.selectedFile != undefined){
      this.uploadImage();
    }    

    // add the project
    this.addNewProject();

    // resets the form

    // TODO: FILE DOES NOT RESET, FIX IT!!!
    this.projectFormGroup.reset();
    
  }

  // add a new project
  private addNewProject() {
    // create empty ProjectImges object
    let newProjectImages: ProjectImages = {
      imageUrl: ''
    }

    // checks if a file was selected
    if (this.selectedFile != undefined) {
    newProjectImages = {
      imageUrl: `assets/images/projects/${this.selectedFile.name}`
      }
    }

    // creates a new project to send to the server
    const newProject: Project = {
      id: 0,
      name: this.name?.value,
      startDate: this.startDate?.value,
      endDate: this.endDate?.value,
      length: 0,
      description: this.description?.value,
      images: [newProjectImages]
    };

    this.projectService.addProject(newProject).subscribe(res => console.log(res));
  }

  // selects the file
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  // handles image uploading
  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.projectService.uploadImage(formData);
  }







  /*processResult() {
  return (data: any) => {
    this.resId = data.id,
      this.resName = data.name,
      this.resStartDate = data.startDate,
      this.resEndDate = data.endDate,
      this.resLength = data.length,
      this.resDescription = data.description,
      this.resImages = data.images;
  }
}*/

}