import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // navigate to initiate searching for projects
  searchProject(keyword: string) {
    this.router.navigateByUrl(`/search/${keyword}`);
  }

  // go to main page and refresh
  refresh() {
    this.router.navigateByUrl(`/projects/nameAsc`)
      .then(() => {
        window.location.reload()
      });
  }
}
