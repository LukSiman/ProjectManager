import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Project } from '../entities/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = environment.springUrl + "/projects";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  // Receives JSON objects and maps them to Project array
  getProjectList(): Observable<Project[]> {
    return this.getProjects(this.baseUrl);
  }

  // Receive a single JSON object by id
  getSingleProject(id: number): Observable<Project> {
    const getUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.get<getProject>(getUrl);
  }

  // Receives JSON objects and maps them to Project array with Pagination
  getProjectListPaginate(thePage: number, thePageSize: number): Observable<getJSONProjects> {
    const searchUrl = `${this.baseUrl}/search/findByOrderByNameAsc?` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<getJSONProjects>(searchUrl);
  }

  // Receives JSON objects and maps them to Project array with Pagination and sorting
  getProjectListSortPaginate(thePage: number, thePageSize: number, sortType: string): Observable<getJSONProjects> {
    const searchUrl = `${this.baseUrl}/search/findBy` + `?sort=${sortType}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<getJSONProjects>(searchUrl);
  }

  // Searches for projects by name
  searchProjects(keyword: string): Observable<Project[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContainingOrderByNameAsc?` + `name=${keyword}`;
    return this.getProjects(searchUrl);
  }

  // Searches for projects by status
  filterProjects(keyword: string): Observable<Project[]> {
    const searchUrl = `${this.baseUrl}/search/findByStatusContainingOrderByNameAsc?` + `name=${keyword}`;
    return this.getProjects(searchUrl);
  }

  // Searches for projects by name with Pagination
  searchProjectListPaginate(thePage: number, thePageSize: number, keyword: string): Observable<getJSONProjects> {
    const searchUrl = `${this.baseUrl}/search/findByNameContainingOrderByNameAsc?` + `name=${keyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<getJSONProjects>(searchUrl);
  }

  // Searches for projects by name with Pagination and sorting
  searchProjectListSortPaginate(thePage: number, thePageSize: number, keyword: string, sortType: string): Observable<getJSONProjects> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining` + `?name=${keyword}&sort=${sortType}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<getJSONProjects>(searchUrl);
  }

  // add a new project
  addProject(project: Project): Observable<Project> {
    const postUrl = `${this.baseUrl}/save`;
    return this.httpClient.post<getProject>(postUrl, project, this.httpOptions);
  }

  // delete the project from DB
  deleteProject(id: number): Observable<string> {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(deleteUrl, { responseType: 'text' });
  }

  updateProject(project: Project): Observable<Project> {
    const projectId = project.id;
    const putUrl = `${this.baseUrl}/${projectId}`;
    return this.httpClient.put<getProject>(putUrl, project).pipe(catchError(this.handleError));
  }

  // uploads the selected file to api
  uploadImage(formData: FormData): Observable<Object> {
    const uploadUrl = `${this.baseUrl}/upload`;
    return this.httpClient.post(uploadUrl, formData).pipe(catchError(this.handleError));
  }

  // Handles errors
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else if (error.status === 413) {
      return throwError(error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  // get all projects
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

interface getProject {
  id: number,
  name: string,
  startDate: Date,
  endDate: Date,
  length: number,
  description: string,
  status: string,
  images: []
}
