import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // go to main page and refresh
  refresh() {
    this.router.navigateByUrl(`/projects/nameAsc`)
      .then(() => {
        window.location.reload()
      });
  }
}
