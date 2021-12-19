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
    return this.getProjects(this.baseUrl);
  }

  // Receives JSON objects and maps them to Project array with Pagination
  getProjectListPaginate(thePage: number, thePageSize: number): Observable<getJSONProjects> {
    const searchUrl = `${this.baseUrl}/search/findByOrderByNameAsc?` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<getJSONProjects>(searchUrl);
  }

  // Receives JSON objects and maps them to Project array with Pagination and sorting
  getProjectListSortPaginate(thePage: number, thePageSize: number, sortType: string): Observable<getJSONProjects> {
   // const searchUrl = `${this.baseUrl}/search/${sortType}?` + `&page=${thePage}&size=${thePageSize}`;
    const searchUrl = `${this.baseUrl}/search/findBy` + `?sort=${sortType}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<getJSONProjects>(searchUrl);
  }

  // Searches for projects by name
  searchProjects(keyword: string): Observable<Project[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContainingOrderByNameAsc?` + `name=${keyword}`;
    return this.getProjects(searchUrl);
  }

  // Searches for projects by name with Pagination
  searchProjectListPaginate(thePage: number, thePageSize: number, keyword: string): Observable<getJSONProjects> {
    const searchUrl = `${this.baseUrl}/search/findByNameContainingOrderByNameAsc?` + `name=${keyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<getJSONProjects>(searchUrl);
  }

  // Searches for projects by name with Pagination and sorting
  searchProjectListSortPaginate(thePage: number, thePageSize: number, keyword: string, sortType: string): Observable<getJSONProjects> {
    //const searchUrl = `${this.baseUrl}/search/${sortType}?` + `name=${keyword}&page=${thePage}&size=${thePageSize}`;    
    const searchUrl = `${this.baseUrl}/search/findByNameContaining` + `?name=${keyword}&sort=${sortType}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<getJSONProjects>(searchUrl);
  }

  // get projects from the backend
  private getProjects(theUrl: string): Observable<Project[]> {
    return this.httpClient.get<getJSONProjects>(theUrl).pipe(
      map(response => response._embedded.projects)
    );
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
