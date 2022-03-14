import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  statusList: string[] = ['All', 'New idea', 'In progress', 'On hold', 'Dropped', 'Completed'];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // navigate to filter
  filter(filterValue: string) {
    const currentUrl = this.router.url;

    console.log(`${currentUrl}/${filterValue}`);

    this.router.navigateByUrl(`${currentUrl}/${filterValue}`);

    // if (currentUrl.includes('search')) {
    //   const newUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
    //   this.router.navigateByUrl(`${newUrl}${sortValue}`);
    // } else {
    //   this.router.navigateByUrl(`/projects/${sortValue}`);
    // }
  }

}
