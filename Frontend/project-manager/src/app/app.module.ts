import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectService } from './services/project.service';
import { Routes, RouterModule } from '@angular/router';
import { SortComponent } from './components/sort/sort.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { DeletionBoxComponent } from './components/deletion-box/deletion-box.component';
import { FilterComponent } from './components/filter/filter.component';
import { ImageBoxComponent } from './components/image-box/image-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent }, //TODO: fix later
  { path: 'login', component: LoginPageComponent }, //TODO: change to default
  { path: 'edit/:id', component: EditProjectComponent },
  { path: 'newProject', component: AddProjectComponent },
  { path: 'projects/:sort/:filter', component: ProjectListComponent },
  { path: 'projects/:sort', redirectTo: '/projects/na/al', pathMatch: 'full' },
  { path: 'search/:keyword/:sort/:filter', component: ProjectListComponent },
  { path: 'search/:keyword', redirectTo: '/search/:keyword/na/al', pathMatch: 'full' },
  { path: '', redirectTo: '/projects/na/al', pathMatch: 'full' },
  { path: '**', redirectTo: '/projects/na/al', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    SortComponent,
    NavbarComponent,
    AddProjectComponent,
    EditProjectComponent,
    DeletionBoxComponent,
    FilterComponent,
    ImageBoxComponent,
    FooterBarComponent,
    LoginPageComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [ProjectService, NgbActiveModal, DeletionBoxComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }