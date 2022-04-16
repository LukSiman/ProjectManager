import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowsAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
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
  errorMessage: string;
  closeBtn = faTimes;
  dragHandle = faArrowsAlt;
  statuses: string[] = ['New idea', 'In progress', 'On hold', 'Dropped', 'Completed'];
  taskStatuses: string[] = ['Not started', 'In progress', 'On hold', 'Completed'];

  private selectedFile: File;
  private newFileName: string;

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50), CustomValidators.notOnlyWhitespace]],
      description: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      status: [this.statuses[0]],
      images: this.formBuilder.array([]),
      tasks: this.formBuilder.array([]),
      fileUpload: ['']
    }, { validators: CustomValidators.endDateAfterStartDate });
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

    // changes taskOrder values 
    for (let i = 0; i < this.tasks.controls.length; i++) {
      this.tasks.controls[i].get('taskOrder')?.setValue(i + 1);
    }

    this.projectCreationController();
  }

  // Controller for handling project creation
  private async projectCreationController(): Promise<void> {
    if (this.selectedFile != undefined || this.selectedFile != null) {
      try {
        // upload the image
        await this.uploadImage();

        // add the project
        await this.addNewProject();

      } catch (error: any) {
        this.errorMessage = error.responseMessage;
        return;
      }
    } else {
      // add the project
      await this.addNewProject();
    }

    // reset the form
    this.formCleaner();
  }

  // add a new project
  private addNewProject(): Promise<Object> {
    // checks if a file was selected and set as the image
    if (this.selectedFile != undefined || this.selectedFile != null) {
      this.handleProjectImages();
    }

    // creates a new project to send to the server
    const newProject: Project = {
      id: 0,
      name: this.name?.value,
      description: this.description?.value,
      startDate: this.startDate?.value,
      endDate: this.endDate?.value,
      length: 0,
      status: this.status?.value,
      tasks: this.tasks?.value,
      images: this.images?.value
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

  // adds a new task to the task list
  addNewTask(): void {
    let projectTask: FormGroup = this.formBuilder.group({
      taskOrder: [this.tasks.length + 1],
      taskDescription: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(4), CustomValidators.notOnlyWhitespace]],
      taskStatus: [this.taskStatuses[0], Validators.required]
    });

    this.tasks.push(projectTask);
  }

  // removes the task from the task list
  removeTask(index: number): void {
    this.tasks.removeAt(index);
  }

  // resets fields of the form
  private formCleaner(): void {
    // resets the form
    this.projectFormGroup.reset();

    // resets tasks FormArray
    this.tasks.clear();

    // resets the file upload field
    this.fileUpload?.reset();

    // resets the selected file
    this.selectedFile = undefined as unknown as File;

    // reset the file name
    this.newFileName = undefined as unknown as string;

    // reset the error message
    this.errorMessage = '';

    this.status?.setValue(this.statuses[0]);
  }

  // manual form reset
  formCleanerManual(): void {
    this.formCleaner();
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

  // allows dragging the tasks
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks.controls, event.previousIndex, event.currentIndex);
  }
}