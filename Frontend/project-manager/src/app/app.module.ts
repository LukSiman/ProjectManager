import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectService } from './services/project.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'projects', component: ProjectListComponent },
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: '**', redirectTo: '/projects', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
