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

  // Receives JSON objects and maps them to Project array with Pagination
  getProjectListPaginate(thePage: number, thePageSize: number,): Observable<getJSONProjects> {
    const searchUrl = `${this.baseUrl}/search/findBy?` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<getJSONProjects>(searchUrl);
  }

  // Receives JSON objects and maps them to Project array with Pagination
  searchProjectListPaginate(thePage: number, thePageSize: number,): Observable<getJSONProjects> {
    const searchUrl = `${this.baseUrl}/search/findBy?` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<getJSONProjects>(searchUrl);
  }
}

interface getJSONProjects {
  _embedded: {
    projects: Project[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
