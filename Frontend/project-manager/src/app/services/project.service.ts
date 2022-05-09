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

  // Receives JSON objects and maps them to Project array with pagination, sorting and filtering
  getProjectListSortFilterPaginate(thePage: number, thePageSize: number, sortType: string, filterType: string): Observable<getJSONProjects> {
    const searchUrl = `${this.baseUrl}/search/findByStatusContaining` + `?status=${filterType}&sort=${sortType}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<getJSONProjects>(searchUrl);
  }

  
  // Receives JSON objects and maps them to Project array with pagination, sorting and filtering
  getProjectListSortFilterPaginateUser(thePage: number, thePageSize: number, sortType: string, filterType: string): Observable<getJSONProjects> {
    const searchUrl = `${this.baseUrl}/search/findByStatusContainingAndUserUsername` + `?status=${filterType}&user=${sessionStorage.getItem('username')}&sort=${sortType}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<getJSONProjects>(searchUrl);
  }

  // Searches for projects by name with pagination, sorting and filtering
  searchProjectListSortFilterPaginate(thePage: number, thePageSize: number, keyword: string, sortType: string, filterType: string): Observable<getJSONProjects> {
    const searchUrl = `${this.baseUrl}/search/findByNameContainingAndStatusContaining` + `?name=${keyword}&status=${filterType}&sort=${sortType}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<getJSONProjects>(searchUrl);
  }

    // Searches for projects by name with pagination, sorting and filtering
    searchProjectListSortFilterPaginateUser(thePage: number, thePageSize: number, keyword: string, sortType: string, filterType: string): Observable<getJSONProjects> {
      const searchUrl = `${this.baseUrl}/search/findByNameContainingAndStatusContainingAndUserUsername` + `?name=${keyword}&status=${filterType}&user=${sessionStorage.getItem('username')}&sort=${sortType}&page=${thePage}&size=${thePageSize}`;
      return this.httpClient.get<getJSONProjects>(searchUrl);
    }

  // add a new project
  addProject(project: Project): Observable<Project> {
    const postUrl = `${this.baseUrl}/save`;
    return this.httpClient.post<getProject>(postUrl, project);
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
    } else if (error.status === 400) {
      return throwError(error.error);
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
  images: [],
  tasks: [],
  userUsername: string
}