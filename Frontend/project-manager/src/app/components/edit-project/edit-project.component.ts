import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/entities/project';
import { ProjectImages } from 'src/app/entities/project-images';
import { ProjectService } from 'src/app/services/project.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  project: Project = new Project();
  projectImages: ProjectImages[] = [];
  projectFormGroup: FormGroup;
  errorMessage: string;

  private selectedFile: File;
  private newFileName: string;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.projectFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(4), CustomValidators.notOnlyWhitespace]],
      startDate: ['', Validators.required],
      endDate: [''],
      description: [''],
      images: ['', CustomValidators.correctFileType]
    }, { validators: CustomValidators.endDateAfterStartDate });

    this.initializeForm();
  }

  // Creates the form and fills out the project data
  private async initializeForm(): Promise<void> {
    await this.initializeProject();

    this.initialValues();
  }

  // Receives the project by id
  private initializeProject(): Promise<Object> {
    const id: number = <number><unknown>this.route.snapshot.paramMap.get('id')!;
    // this.projectService.getSingleProject(id).subscribe(res => this.processResult(res));

    return new Promise((resolve, reject) => {
      this.projectService.getSingleProject(id).subscribe(response => {
        this.processResult(response);
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  private initialValues(): void {
    this.name?.setValue(`${this.project.name}`);
    this.startDate?.setValue(`${this.project.startDate}`);
    this.endDate?.setValue(`${this.project.endDate}`);
    this.description?.setValue(`${this.project.description}`);
    // this.images?.setValue(`${this.project.images}`);
    console.log(this.project.images); //TODO: DELETE LATER
    console.log(this.projectImages);
  }

  get name() { return this.projectFormGroup.get('name'); }
  get startDate() { return this.projectFormGroup.get('startDate'); }
  get endDate() { return this.projectFormGroup.get('endDate'); }
  get description() { return this.projectFormGroup.get('description'); }
  get images() { return this.projectFormGroup.get('images'); }

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

    // this.projectCreationController();
    this.updateProject();
  }

  private updateProject(): void {
    this.project.name = this.name?.value,
      this.project.startDate = this.startDate?.value,
      this.project.endDate = this.endDate?.value,
      this.project.description = this.description?.value,
      // this.project.images = [newProjectImage]

      this.projectService.updateProject(this.project).subscribe(res => console.log(res));

    // TODO: How to handle images
    // Show current
    // Remove images
    // Add new images

    // shows a message that changes have been save
    this.changesMessage(); 
  }

  // shows a message and fades out
  private changesMessage(): void{
    let updateConfirmation = document.getElementById('changes');
    updateConfirmation?.classList.toggle('d-none');

    setTimeout(() => {
      updateConfirmation?.classList.toggle('fade-out');      
    }, 2000);

    setTimeout(() => {
      updateConfirmation?.classList.add('d-none');    
      updateConfirmation?.classList.remove('fade-out');    
    }, 3000);   
  }

  private async projectCreationController(): Promise<void> {
    if (this.selectedFile != undefined || this.selectedFile != null) {
      try {
        // upload the image
        let imgRes = await this.uploadImage();
        console.log(imgRes); // TODO: delete later

        // add the project
        let prjRes = await this.addNewProject();
        console.log(prjRes); // TODO: delete later

      } catch (error: any) {
        this.errorMessage = error;
        return;
      }
    } else {
      // add the project
      let prjRes = await this.addNewProject();
      console.log(prjRes); // TODO: delete later
    }

    this.formCleaner();
  }

  // resets fields of the form
  private formCleaner(): void {
    // resets the form
    this.initialValues();

    // resets the selected file
    this.selectedFile = undefined as unknown as File;
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
      startDate: this.startDate?.value,
      endDate: this.endDate?.value,
      length: 0,
      description: this.description?.value,
      images: [newProjectImage]
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

  // Initializes the project fields
  private processResult(responseProject: Project): void {
    this.project.id = responseProject.id;
    this.project.name = responseProject.name;
    this.project.startDate = responseProject.startDate;
    this.project.endDate = responseProject.endDate;
    this.project.length = responseProject.length;
    this.project.description = responseProject.description;
    this.project.images = responseProject.images;
    this.projectImages = responseProject.images;
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