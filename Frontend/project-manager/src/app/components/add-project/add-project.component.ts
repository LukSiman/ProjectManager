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
  errorMessage: string;
  statuses: string[] = ['New idea', 'In progress', 'On hold', 'Dropped', 'Completed'];

  private selectedFile: File;
  private newFileName: string;

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(4), CustomValidators.notOnlyWhitespace]],
      description: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      status: [this.statuses[0]],
      images: ['', CustomValidators.correctFileType],
      tasks: ['']
    }, { validators: CustomValidators.endDateAfterStartDate });
  }

  get name() { return this.projectFormGroup.get('name'); }
  get description() { return this.projectFormGroup.get('description'); }
  get startDate() { return this.projectFormGroup.get('startDate'); }
  get endDate() { return this.projectFormGroup.get('endDate'); }
  get status() { return this.projectFormGroup.get('status'); }
  get images() { return this.projectFormGroup.get('images'); }
  get tasks() { return this.projectFormGroup.get('tasks'); }

  // informs user of required fields and initiates project adding to DB 
  checkForm(): void {
    // resets the error message is not empty
    if (this.errorMessage != undefined || this.errorMessage != '') {
      this.errorMessage = '';
    }

    // required field check
    if (this.projectFormGroup.invalid) {
      this.projectFormGroup.markAllAsTouched();
      return;
    }

    this.projectCreationController();
  }

  private async projectCreationController(): Promise<void> {
    if (this.selectedFile != undefined || this.selectedFile != null) {
      try {
        // upload the image
        await this.uploadImage();

        // add the project
        await this.addNewProject();

      } catch (error: any) {
        this.errorMessage = error;
        return;
      }
    } else {
      // add the project
      await this.addNewProject();
    }

    this.formCleaner();
  }

  // resets fields of the form
  private formCleaner(): void {
    // resets the form
    this.projectFormGroup.reset();

    // resets the selected file
    this.selectedFile = undefined as unknown as File;

    this.status?.setValue(this.statuses[0]);
  }

    // manual form reset
   formCleanerManual(): void {
      this.formCleaner();
      this.errorMessage = '';
    }

  // add a new project
  private addNewProject(): Promise<Object> {
    // create a project image object 
    let newProjectImage: ProjectImages = this.handleProjectImages();

    // creates a new project to send to the server
    const newProject: Project = {
      id: 0,
      name: this.name?.value,
      description: this.description?.value,
      startDate: this.startDate?.value,
      endDate: this.endDate?.value,
      length: 0,
      status: this.status?.value,
      images: [newProjectImage],
      tasks: []
    };

    // call service to add the project
    return new Promise((resolve, reject) => {
      this.projectService.addProject(newProject).subscribe(response => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
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
        imageUrl: `assets/images/projects/${this.newFileName}`
      }
    }

    return newProjectImages;
  }

  // selects the file
  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
  }

  // handles image uploading
  private uploadImage(): Promise<Object> {
    const formData = new FormData();
    this.newFileName = this.fileNameGenerator(this.selectedFile.name);
    formData.append('file', this.selectedFile, this.newFileName);

    return new Promise((resolve, reject) => {
      this.projectService.uploadImage(formData).subscribe(response => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  // Add a timestamp to the filename
  private fileNameGenerator(fileName: string): string {
    const date = new Date();
    const timeStamp = date.getTime();
    fileName = fileName.substring(0, fileName.lastIndexOf('.'));
    return `${fileName}${timeStamp}.png`;
  }
}