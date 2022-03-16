import { Component, OnInit } from '@angular/core';
import { PRIMARY_OUTLET, Router, UrlSegment, UrlTree } from '@angular/router';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {

  sortList: { key: string, value: string }[] = [
    { key: 'Name A-Z', value: 'na' }, { key: 'Name Z-A', value: 'nd' },
    { key: 'Newest', value: 'da' }, { key: 'Oldest', value: 'dd' },
    { key: 'Longest', value: 'la' }, { key: 'Shortest', value: 'ld' }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // navigate to initiate sorting
  sort(sortValue: string): void {
    // get the current url
    const currentUrl: string = this.router.url;

    // separate the url into separate segments 
    const urlTree: UrlTree = this.router.parseUrl(currentUrl);
    const urlSegments: UrlSegment[] = urlTree.root.children[PRIMARY_OUTLET].segments;

    let newUrl: string = '';

    // build new url from segments
    if (currentUrl.includes('search')){
      newUrl = (`${urlSegments[0]}/${urlSegments[1]}/${sortValue}/${urlSegments[3]}`);
    } else {
      newUrl = (`${urlSegments[0]}/${sortValue}/${urlSegments[2]}`);
    }

    this.router.navigateByUrl(newUrl);
  }
}
