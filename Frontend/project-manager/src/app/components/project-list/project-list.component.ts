import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/entities/project';
import { ProjectImages } from 'src/app/entities/project-images';
import { ProjectImagesService } from 'src/app/services/project-images.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];

  images: ProjectImages[] = [];

  // properties for pagination
  thePageNumber: number = 0;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(private projectService: ProjectService, private projectImagesService: ProjectImagesService) { }

  ngOnInit(): void {
    this.displayProjectsPaginate();
  }

  // Copies objects from array in service to projects array
  displayProjects() {
    this.projectService.getProjectList().subscribe(
      data => {
        this.projects = data;
      }
    );
  }

  // Copies objects from array in service to projects array with Pagination
  displayProjectsPaginate() {
    this.projectService.getProjectListPaginate(this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
  }

  processResult() {
    return data => {
      this.projects = data._embedded.projects;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  // Gets images from the project image service 
  displayPictures() {
    let projectId: number = 2;

    this.projectImagesService.getImagesById(projectId).subscribe(
      data => {
        this.images = data;
        console.log(data);
      }
    )
  }
}
