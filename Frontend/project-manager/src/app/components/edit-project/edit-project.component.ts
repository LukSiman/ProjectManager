import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/entities/project';
import { ProjectImages } from 'src/app/entities/project-images';
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
  projectImages: ProjectImages[] = [];
  projectFormGroup: FormGroup;
  errorMessage: string;
  closeBtn = faTimes;

  private selectedFile: File;
  private newFileName: string;
  private previousImage: HTMLElement;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private formBuilder: FormBuilder, private imageService: ProjectImagesService) { }

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
    this.project.startDate = responseProject.startDate;
    this.project.endDate = responseProject.endDate;
    this.project.length = responseProject.length;
    this.project.description = responseProject.description;
    this.project.images = responseProject.images;
    this.projectImages = responseProject.images;
  }

  // sets initial project values into the appropriate fields
  private initialValues(): void {
    this.name?.setValue(`${this.project.name}`);
    this.startDate?.setValue(`${this.project.startDate}`);
    this.endDate?.setValue(`${this.project.endDate}`);
    this.description?.setValue(`${this.project.description}`);
    this.images?.reset();
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

    this.projectUpdateController();
  }

  // Controller for handling updating the project
  private async projectUpdateController(): Promise<void> {
    if (this.selectedFile != undefined || this.selectedFile != null) {
      try {
        // upload the image
        await this.uploadImage();

        // update the project
        await this.updateProject();

      } catch (error: any) {
        this.errorMessage = error;
        return;
      }
    } else {
      // update the project
      await this.updateProject();
    }

    window.location.reload();
  }


  // updates the project with the new values
  private updateProject(): Promise<Object> {
    this.project.name = this.name?.value;
    this.project.startDate = this.startDate?.value;

    if (this.endDate?.value != 'null') {
      this.project.endDate = this.endDate?.value;
    }

    this.project.description = this.description?.value;

    // checks if a file was selected and set as the image
    if (this.selectedFile != undefined || this.selectedFile != null) {
      let newProjectImage: ProjectImages = this.handleProjectImages();
      this.project.images = [newProjectImage];
    }

    this.projectService.updateProject(this.project).subscribe();

    // shows a message that changes have been saved
    this.changesMessage();

    // call service to add the project
    return new Promise((resolve) => {
      resolve('OK');
    });
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
    let currentImage: HTMLElement = currentElement;

    //  making sure onyl the correct element is being manipulated
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

  // removes the image from DB and reloads page
  removeImage(id: number): void {
    this.imageService.removeImageByID(id).subscribe(response => console.log(response));
    window.location.reload();
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

  // create and return a new ProjectImage object
  private handleProjectImages(): ProjectImages {
    // create a new ProjectImages object and set the file name
    let newProjectImages: ProjectImages = {
      imageUrl: `assets/images/projects/${this.newFileName}`
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

    // TODO: MOVE upload image to image service

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