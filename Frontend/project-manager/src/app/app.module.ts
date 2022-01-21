import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectService } from './services/project.service';
import { Routes, RouterModule } from '@angular/router';
import { SortComponent } from './components/sort/sort.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'newProject', component: AddProjectComponent },
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
    SortComponent,
    NavbarComponent,
    AddProjectComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }