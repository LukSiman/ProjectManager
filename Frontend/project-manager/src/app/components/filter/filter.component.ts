import { Component, OnInit } from '@angular/core';
import { PRIMARY_OUTLET, Router, UrlSegment, UrlTree } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  filterList: { key: string, value: string }[] = [
    { key: 'All', value: 'al' }, { key: 'New idea', value: 'ni' },
    { key: 'In progress', value: 'ip' }, { key: 'On hold', value: 'oh' },
    { key: 'Dropped', value: 'dr' }, { key: 'Completed', value: 'co' }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // navigate to filter url
  filter(filterValue: string): void {
    // get the current url
    const currentUrl: string = this.router.url;

    // put the url into segment array
    const urlTree: UrlTree = this.router.parseUrl(currentUrl);
    const urlSegments: UrlSegment[] = urlTree.root.children[PRIMARY_OUTLET].segments;

    let newUrl: string = '';

    // build new url from the segments
    if (currentUrl.includes('search')) {
      newUrl = (`${urlSegments[0]}/${urlSegments[1]}/${urlSegments[2]}/${filterValue}`);
    } else {
      newUrl = (`${urlSegments[0]}/${urlSegments[1]}/${filterValue}`);
    }

    this.router.navigateByUrl(newUrl);
  }

}
