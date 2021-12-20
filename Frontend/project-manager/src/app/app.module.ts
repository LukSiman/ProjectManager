import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectService } from './services/project.service';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SortComponent } from './components/sort/sort.component';
import { LogoComponent } from './components/logo/logo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: 'projects/:sort', component: ProjectListComponent },
  { path: 'search/:keyword/:sort', component: ProjectListComponent },
  { path: 'search/:keyword', redirectTo: '/search/:keyword/nameAsc', pathMatch: 'full' },
  { path: '', redirectTo: '/projects/nameAsc', pathMatch: 'full' },
  { path: '**', redirectTo: '/projects/nameAsc', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    SearchComponent,
    SortComponent,
    LogoComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }