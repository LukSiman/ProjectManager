import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Project } from '../entities/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = environment.springUrl + "/projects";

  constructor(private httpClient: HttpClient) { }

  // Receives JSON objects and maps them to Project array
  getProjectList(): Observable<Project[]> {
    return this.httpClient.get<getJSONProjects>(this.baseUrl).pipe(
      map(response => response._embedded.projects)
    );
  }
}

interface getJSONProjects {
  _embedded: {
    projects: Project[];
  },
}
