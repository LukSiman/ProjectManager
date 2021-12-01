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

  constructor(private projectService: ProjectService, private projectImagesService: ProjectImagesService) { }

  ngOnInit(): void {
    this.displayProjects();
  }

  // Copies objects from array in service to projects array
  displayProjects() {
    this.projectService.getProjectList().subscribe(
      data => {
        this.projects = data;
      }
    );
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
