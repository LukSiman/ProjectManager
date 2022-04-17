import { Component, HostListener, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/entities/project';
import { ProjectImagesService } from 'src/app/services/project-images.service';
import { ProjectService } from 'src/app/services/project.service';
import { DeletionBoxComponent } from '../deletion-box/deletion-box.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  defaultImage: string = '';

  // properties for searching
  searchMode: boolean = false;
  previousKeyword: string = '';

  // properties for sorting
  sortMap = new Map<string, string>([
    ['na', 'name'], ['nd', 'name,desc'],
    ['da', 'startDate,desc'], ['dd', 'startDate'],
    ['la', 'length,desc'], ['ld', 'length'],
    ['sa', 'status'], ['sd', 'status,desc']
  ]);

  // properties for filtering
  filterMap = new Map<string, string>([
    ['al', ''], ['ni', 'new'],
    ['ip', 'progress'], ['oh', 'hold'],
    ['dr', 'dropped'], ['co', 'completed']
  ]);

  // properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 8;
  theTotalElements: number = 0;

  private previousCard: HTMLElement;

  constructor(private projectService: ProjectService, private imageService: ProjectImagesService, private route: ActivatedRoute,
    private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    // gets the default image url from the server
    this.imageService.getDefaultImage().subscribe(res => this.defaultImage = res);

    this.route.paramMap.subscribe(() => {
      this.displayProjects();
    });
  }

  // call the search or all method depending on if keyword exists
  displayProjects(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.displaySearchProjectsSortedFiltered();
    } else {
      this.displayAllProjectsSortedFiltered();
    }
  }

  // Copies objects from array in service to projects array with sorting and filtering
  private displayAllProjectsSortedFiltered(): void {
    // gets the value for sorting from url
    const sortValue: string = this.route.snapshot.paramMap.get('sort')!;

    // checks the sorting map to see which sorting method to use
    const sortUrl: string = this.sortMap.get(sortValue)!;

    // gets the value for filtering from url
    const filterValue: string = this.route.snapshot.paramMap.get('filter')!;

    // checks the filter map to see which filtering method to use
    const filterUrl: string = this.filterMap.get(filterValue)!;

    // send page number, size and sorting url to service for it to get data from the backend
    this.projectService.getProjectListSortFilterPaginate(this.thePageNumber - 1, this.thePageSize, sortUrl, filterUrl)
      .subscribe(response => {
        this.processResult(response);
        this.populateImages();
      });
  }

  // Copies objects from array in service to projects array with sorting and filtering
  private displaySearchProjectsSortedFiltered(): void {
    // gets the searched keyword
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != keyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = keyword;

    // gets the value for sorting from url
    const sortValue: string = this.route.snapshot.paramMap.get('sort')!;

    // checks the sorting map to see which sorting method to use
    const sortUrl: string = this.sortMap.get(sortValue)!;

    // gets the value for filtering from url
    const filterValue: string = this.route.snapshot.paramMap.get('filter')!;

    // checks the filter map to see which filtering method to use
    const filterUrl: string = this.filterMap.get(filterValue)!;

    this.projectService.searchProjectListSortFilterPaginate(this.thePageNumber - 1, this.thePageSize, keyword, sortUrl, filterUrl)
      .subscribe(response => {
        this.processResult(response);
        this.populateImages();
      });
  }

  // add images to the projects
  private populateImages(): void {
    this.projects.forEach(project => {
      this.projectService.getSingleProject(project.id).subscribe(response => {
        project.images = response.images;
      });
    });
  }

  // processes the results from server
  private processResult(response: any): void {
    this.projects = response._embedded.projects;
    this.thePageNumber = response.page.number + 1;
    this.thePageSize = response.page.size;
    this.theTotalElements = response.page.totalElements;
  }

  // navigates to component for adding new projects
  addNewProjectNavigation(): void {
    this.router.navigateByUrl('/newProject');
  }

  // click eventListener to blur the cards and show buttons
  @HostListener('click', ['$event.target'])
  onClick(currentElement: HTMLElement): void {
    let currentCard: HTMLElement = currentElement;

    // makes sure that only the correct card is being manipulated
    if (currentElement.closest('#cardParent') && !(currentElement.classList.contains('carousel-control-next') ||
      currentElement.classList.contains('carousel-control-next-icon') || currentElement.classList.contains('carousel-control-prev') ||
      currentElement.classList.contains('carousel-control-prev-icon'))) {
      currentCard = currentElement.closest('#cardParent')!;
    } else {
      // remove blurring
      let blurredCards = document.body.querySelectorAll('#cardParent');
      blurredCards.forEach((card) => {
        card.lastElementChild?.classList.add('d-none');
      });
      return;
    }

    // removes blur and buttons from previous card 
    if ((this.previousCard != currentCard)) {
      let blurredCards = document.body.querySelectorAll('#cardParent');
      blurredCards.forEach((card) => {
        card.lastElementChild?.classList.add('d-none');
      });
    }

    // toggles the blur effect
    currentCard.lastElementChild?.classList.toggle('d-none');

    this.previousCard = currentCard;
  }

  // deletes the selected project
  deletionConfirmation(id: number): void {
    const modalRef = this.modalService.open(DeletionBoxComponent, { centered: true });
    modalRef.componentInstance.deleteID = id;
  }
}