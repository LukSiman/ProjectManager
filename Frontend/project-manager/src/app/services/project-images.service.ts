import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProjectImages } from '../entities/project-images';

@Injectable({
  providedIn: 'root'
})
export class ProjectImagesService {

  private imagesUrl = environment.springUrl + "/images";

  constructor(private httpClient: HttpClient) { }

  // Receives JSON objects for the images and maps them to the array //TODO: Remove later
  getImagesById(projectId: number): Observable<ProjectImages[]> {
    const searchImageUrl = `${this.imagesUrl}/search/findByProjectId?id=${projectId}`;

    return this.httpClient.get<getJSONImages>(searchImageUrl).pipe(
      map(response => response._embedded.images)
    );
  }

  // removes an image from the project
  removeImage(od: number): void {
    
  }

}

interface getJSONImages {
  _embedded: {
    images: ProjectImages[];
  }
}
