import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private authentication: AuthenticationService) { }

  authenticationStatus: boolean;

  ngOnInit(): void {
    this.authenticationStatus = this.authentication.isUserLoggedIn();
  }

  // navigate to initiate searching for projects
  searchProject(keyword: string) {
    this.router.navigateByUrl(`/search/${keyword}`);
  }

  // go to main page and refresh
  refresh() {
    this.router.navigateByUrl(`/projects`)
      .then(() => {
        window.location.reload()
      });
  }
}