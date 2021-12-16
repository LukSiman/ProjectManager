import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {

  links: {key: string, value: string}[]  = [
    {key:'Name A-Z', value:'nameAsc'}, {key:'Name Z-A', value:'nameDsc'},
    {key:'Newest', value:'dateAsc'}, {key:'Oldest', value:'dateDsc'},
    {key:'Longest', value:'lengthAsc'}, {key:'Shortest', value:'lengthDsc'}
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // navigate to initiate sorting
  sort(sortValue: string){
    this.router.navigateByUrl(`/projects/${sortValue}`);
  }
}
