import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/entities/project';
import { ProjectImages } from 'src/app/entities/project-images';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  images: ProjectImages[] = [];

  // properties for searching
  searchMode: boolean = false;
  previousKeyword: string = '';

  // properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.displayProjects();
    });
  }

  // call the search or all method depending on if keyword exists
  displayProjects() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.displaySearchProjects();
    } else {
      this.displayAllProjects();
    }
  }

  // Copies objects from array in service to projects array if project name includes the keyword
  displaySearchProjects() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != keyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = keyword;

    this.projectService.searchProjectListPaginate(this.thePageNumber - 1, this.thePageSize, keyword)
      .subscribe(this.processResult());
  }

  // Copies objects from array in service to projects array
  displayAllProjects() {
    this.projectService.getProjectListPaginate(this.thePageNumber - 1, this.thePageSize)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      this.projects = data._embedded.projects;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }
}
