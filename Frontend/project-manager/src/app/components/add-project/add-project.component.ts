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

  private selectedFile: File;
  private newFileName: string;

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService, private http: HttpClient) { }

  ngOnInit(): void {
    this.projectFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(4), CustomValidators.notOnlyWhitespace]],
      startDate: ['', Validators.required],
      endDate: [''],
      description: [''],
      images: ['', CustomValidators.correctFileType]
    }, { validators: CustomValidators.endDateAfterStartDate });
  }

  get name() { return this.projectFormGroup.get('name'); }
  get startDate() { return this.projectFormGroup.get('startDate'); }
  get endDate() { return this.projectFormGroup.get('endDate'); }
  get description() { return this.projectFormGroup.get('description'); }
  get images() { return this.projectFormGroup.get('images'); }

  // informs user of required fields and initiates project adding to DB
  checkForm() {
    // required field check
    if (this.projectFormGroup.invalid) {
      this.projectFormGroup.markAllAsTouched();
      return;
    }

    // checks if file was selected
    if (this.selectedFile != undefined || this.selectedFile != null) {
      this.uploadImage();
    }

    // add the project
    this.addNewProject();

    // resets the form
    this.projectFormGroup.reset();

    // resets the selected file
    this.selectedFile = undefined as unknown as File;
  }

  // add a new project
  private addNewProject() {
    // create a project image object 
    let newProjectImage: ProjectImages = this.handleProjectImages();

    // creates a new project to send to the server
    const newProject: Project = {
      id: 0,
      name: this.name?.value,
      startDate: this.startDate?.value,
      endDate: this.endDate?.value,
      length: 0,
      description: this.description?.value,
      images: [newProjectImage]
    };

    // call service to add the project
    this.projectService.addProject(newProject).subscribe(res => console.log(res));
  }

  // create and return a new ProjectImage object
  private handleProjectImages(): ProjectImages {
    // create empty ProjectImages object
    let newProjectImages: ProjectImages = {
      imageUrl: ''
    }

    // checks if a file was selected and set as the image
    if (this.selectedFile != undefined || this.selectedFile != null) {
      newProjectImages = {
        //imageUrl: `assets/images/projects/${this.selectedFile.name}`
        imageUrl: `assets/images/projects/${this.newFileName}`
      }
    }

    return newProjectImages;
  }

  // selects the file
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  // handles image uploading
  private uploadImage() {
    const formData = new FormData();
    this.newFileName = this.fileNameGenerator(this.selectedFile.name);
    formData.append('file', this.selectedFile, this.newFileName);
    this.projectService.uploadImage(formData);
  }

  // Add a timestamp to the filename
  private fileNameGenerator(fileName: string): string {
    const date = new Date();
    const timeStamp = date.getTime();
    fileName = fileName.substring(0, fileName.lastIndexOf('.'));
    return `${fileName}${timeStamp}.png`;
  }



   /* private resId: number;
  private resName: string;
  private resStartDate: Date;
  private resEndDate: Date;
  private resLength: number;
  private resDescription: string;
  private resImages: [];*/

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