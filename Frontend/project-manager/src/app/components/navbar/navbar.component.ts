import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticationStatus: boolean = false;
  username: string = '';
  userIcon = faUser;

  constructor(private router: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.username = sessionStorage.getItem('username')!;
        this.authenticationStatus = this.authentication.isUserLoggedIn();
      }
    });
  }

  // navigate to initiate searching for projects
  searchProject(keyword: string): void {
    this.router.navigateByUrl(`/search/${keyword}`);
  }

  // go to main page and refresh
  refresh(): void {
    this.router.navigateByUrl(`/projects`)
      .then(() => {
        window.location.reload()
      });
  }
}