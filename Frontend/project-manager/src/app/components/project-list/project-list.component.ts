import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/entities/project';
import { ProjectImages } from 'src/app/entities/project-images';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  plusIcon = faPlus;

  projects: Project[] = [];
  images: ProjectImages[] = [];

  // properties for searching
  searchMode: boolean = false;
  previousKeyword: string = '';

  // properties for sorting
  linksMap = new Map<string, string>([
    ['nameAsc', 'name'], ['nameDsc', 'name,desc'],
    ['dateAsc', 'startDate,desc'], ['dateDsc', 'startDate'],
    ['lengthAsc', 'length,desc'], ['lengthDsc', 'length']
  ]);

  // properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 8;
  theTotalElements: number = 0;

  private previousCard: HTMLElement;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.displayProjects();
    });
  }

  // call the search or all method depending on if keyword exists
  displayProjects(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.displaySearchProjectsSorted();
    } else {
      this.displayAllProjectsSorted();
    }
  }

  // Copies objects from array in service to projects array if project name includes the keyword
  private displaySearchProjectsSorted(): void {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != keyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = keyword;

    // gets the value for sorting from url
    const sortValue: string = this.route.snapshot.paramMap.get('sort')!;

    // checks the links map to see which sorting method to use acording to the sorting value
    const sortUrl: string = this.linksMap.get(sortValue)!;

    this.projectService.searchProjectListSortPaginate(this.thePageNumber - 1, this.thePageSize, keyword, sortUrl)
      .subscribe(this.processResult());
  }

  // Copies objects from array in service to projects array with different sorting
  private displayAllProjectsSorted(): void {
    // gets the value for sorting from url
    const sortValue: string = this.route.snapshot.paramMap.get('sort')!;

    // checks the links map to see which sorting method to use acording to the sorting value
    const sortUrl: string = this.linksMap.get(sortValue)!;

    // send page number, size and sorting url to service for it to get data from the backend
    this.projectService.getProjectListSortPaginate(this.thePageNumber - 1, this.thePageSize, sortUrl)
      .subscribe(this.processResult());
  }

  private processResult() {
    return (data: any) => {
      this.projects = data._embedded.projects;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  // navigates to component for adding new projects
  addNewProjectNavigation(): void {
    this.router.navigateByUrl('/newProject');
  }

  // click eventListener to blur the cards
  @HostListener('click', ['$event.target'])
  onClick(currentCard: HTMLElement): void {
    // removes blur and buttons from previous card 
    if (this.previousCard != currentCard) {
      let bluredCards = document.querySelectorAll('.cardBlur');
      bluredCards.forEach((card) => {
        card.classList.remove('cardBlur');
        card.lastElementChild?.classList.add('d-none');
      });
    }   

    // TODO: buttons are not blured

    // ensures that only the correct parent element gets manipulated
    let parent = currentCard.parentElement;
    let biggerParent = currentCard.parentElement?.parentElement;

    if (parent?.id == 'cardParent') {
      parent.classList.toggle('cardBlur');
      parent.lastElementChild?.classList.toggle('d-none');
    } else if (biggerParent?.id) {
      biggerParent.classList.toggle('cardBlur');
      biggerParent.lastElementChild?.classList.toggle('d-none');
    }

    this.previousCard = currentCard;
  }
}