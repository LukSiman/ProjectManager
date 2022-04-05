import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/entities/project';
import { ProjectImagesService } from 'src/app/services/project-images.service';
import { ProjectService } from 'src/app/services/project.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  project: Project = new Project();
  projectFormGroup: FormGroup;
  errorMessage: string;
  closeBtn = faTimes;
  statuses: string[] = ['New idea', 'In progress', 'On hold', 'Dropped', 'Completed'];
  taskStatuses: string[] = ['Not started', 'In progress', 'On hold', 'Completed'];

  private selectedFile: File;
  private newFileName: string;
  private previousImage: HTMLElement;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private formBuilder: FormBuilder, private imageService: ProjectImagesService) { }

  ngOnInit(): void {
    this.projectFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50), CustomValidators.notOnlyWhitespace]],
      description: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      status: [''],
      images: this.formBuilder.array([]),
      tasks: this.formBuilder.array([]),
      fileUpload: ['']
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

    return new Promise((resolve, reject) => {
      this.projectService.getSingleProject(id).subscribe(response => {
        this.processResult(response);
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  // Initializes the project fields
  private processResult(responseProject: Project): void {
    this.project.id = responseProject.id;
    this.project.name = responseProject.name;
    this.project.description = responseProject.description;
    this.project.startDate = responseProject.startDate;
    this.project.endDate = responseProject.endDate;
    this.project.length = responseProject.length;
    this.project.status = responseProject.status;
    this.project.images = responseProject.images;
    this.project.tasks = responseProject.tasks;
  }

  // sets initial project values into the appropriate fields
  private initialValues(): void {
    this.name?.setValue(this.project.name);
    this.description?.setValue(this.project.description);
    this.startDate?.setValue(this.project.startDate);
    this.endDate?.setValue(this.project.endDate);
    this.status?.setValue(this.project.status);

    // initialization for the projects tasks
    for (let project of this.project.tasks) {
      let projectTask = this.formBuilder.group({
        taskId: [project.taskId],
        taskOrder: [project.taskOrder],
        taskDescription: [project.taskDescription],
        taskStatus: [project.taskStatus]
      });

      this.tasks.push(projectTask);
    }

    // initialization for the projects tasks
    for (let image of this.project.images) {
      let projectImage = this.formBuilder.group({
        imageId: [image.imageId],
        imageUrl: [image.imageUrl]
      });

      this.images.push(projectImage);
    }

    // disables the main fields
    this.projectFormGroup.disable();
  }

  get name() { return this.projectFormGroup.get('name'); }
  get description() { return this.projectFormGroup.get('description'); }
  get startDate() { return this.projectFormGroup.get('startDate'); }
  get endDate() { return this.projectFormGroup.get('endDate'); }
  get status() { return this.projectFormGroup.get('status'); }
  get images() { return this.projectFormGroup.get('images') as FormArray; }
  get tasks() { return this.projectFormGroup.get('tasks') as FormArray; }
  get fileUpload() { return this.projectFormGroup.get('fileUpload'); }

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

    this.projectUpdateController();
  }

  // Controller for handling updating the project
  private async projectUpdateController(): Promise<void> {
    if (this.selectedFile != undefined || this.selectedFile != null) {
      try {
        // upload the image
        await this.uploadImage();

        // update the project
        await this.updateProject()

      } catch (error: any) {
        this.errorMessage = error.responseMessage;
        return;
      }
    } else {
      // update the project
      await this.updateProject();
    }

    // reset the form
    this.initializeForm();
    this.formCleaner();
  }


  // updates the project with the new values
  private updateProject(): Promise<Object> {
    this.project.name = this.name?.value;
    this.project.description = this.description?.value;
    this.project.startDate = this.startDate?.value;

    if (this.endDate?.value != 'null') {
      this.project.endDate = this.endDate?.value;
    }

    this.project.status = this.status?.value;

    this.project.tasks = this.tasks.value;

    // checks if a file was selected and set as the image
    if (this.selectedFile != undefined || this.selectedFile != null) {
      this.handleProjectImages();
    }

    this.project.images = this.images.value;

    // call service to add the project
    return new Promise((resolve, reject) => {
      this.projectService.updateProject(this.project).subscribe(response => {
        resolve(response);
        // shows a message that changes have been saved
        this.changesMessage();
      }, (error) => {
        reject(error);
      });
    });
  }

  // adds a new task to the task list
  addNewTask(): void {
    if (this.projectFormGroup.status == 'DISABLED') {
      alert("Please enable editing");
      return;
    }

    let projectTask: FormGroup = this.formBuilder.group({
      taskOrder: [this.tasks.length + 1],
      taskDescription: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(4), CustomValidators.notOnlyWhitespace]],
      taskStatus: [this.taskStatuses[0], Validators.required]
    });

    this.tasks.push(projectTask);
  }

  // removes the task from the task list
  removeTask(index: number): void {
    if (this.projectFormGroup.status == 'DISABLED') {
      return;
    }

    this.tasks.removeAt(index);
  }

  // shows a message and fades out
  private changesMessage(): void {
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

  // click eventListener to blur the image and show deletion button
  @HostListener('click', ['$event.target'])
  onClick(currentElement: HTMLElement): void {
    // disable image manipulation if form is disabled
    if (this.projectFormGroup.status == 'DISABLED') {
      return;
    }

    let currentImage: HTMLElement = currentElement;

    //  making sure only the correct element is being manipulated
    if (currentElement.parentElement?.id == 'projectImage') {
      currentImage = currentElement.parentElement;
    } else {
      return;
    }

    // if this is a different image than before, unblur everything else
    if (this.previousImage != currentImage) {
      let blurredImages = document.body.querySelectorAll('#projectImage');
      blurredImages.forEach((image) => {
        image.firstElementChild?.classList.remove('blurImage');
        image.lastElementChild?.classList.add('d-none');
      });
    }

    // blur image and unhide the deletion button
    currentImage.firstElementChild?.classList.toggle('blurImage');
    currentImage.lastElementChild?.classList.toggle('d-none');

    this.previousImage = currentImage;
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  // resets fields of the form
  private formCleaner(): void {
    // resets tasks FormArray
    this.tasks.clear();

    // resets images FormArray
    this.images.clear();

    // resets the file upload field //TODO: Check if no bugs
    this.fileUpload?.reset();

    // resets the selected file
    this.selectedFile = undefined as unknown as File;

    // reset the file name
    this.newFileName = undefined as unknown as string;

    // reset the error message
    this.errorMessage = '';
  }

  // manual form reset
  formCleanerManual(): void {
    this.formCleaner();
    this.initializeForm();
  }

  // add a new image to the FormArray
  private handleProjectImages(): void {
    let projectImage = this.formBuilder.group({
      imageUrl: [`assets/images/projects/${this.newFileName}`]
    });

    this.images.push(projectImage);
  }

  // selects the file
  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
  }

  // handles image uploading
  private uploadImage(): Promise<Object> {
    const formData: FormData = new FormData();
    this.newFileName = this.fileNameGenerator(this.selectedFile.name);
    formData.append('file', this.selectedFile, this.newFileName);

    // the current count of images in the array to check against the limit
    let count: string = `${this.images.length}`;
    formData.append('count', count);

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
    const date: Date = new Date();
    const timeStamp: number = date.getTime();

    let extension: string = '';

    if (fileName.includes('.')) {
      let extensionIndex: number = fileName.lastIndexOf('.');
      extension = fileName.substring(extensionIndex);
      fileName = fileName.substring(0, extensionIndex);
    }

    return `${fileName}${timeStamp}${extension}`;
  }

  // toggles if the fields can be edited
  toggleEditable(): void {
    if (this.projectFormGroup.status == 'DISABLED') {
      this.projectFormGroup.enable();
    } else {
      this.projectFormGroup.disable();
    }
  }
}