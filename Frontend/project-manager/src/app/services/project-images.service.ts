import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectImagesService {

  private imagesUrl = environment.springUrl + "/images";

  constructor(private httpClient: HttpClient) { }

  getDefaultImage(): Observable<string>{
    const imageUrl = `${this.imagesUrl}/default`;
    return this.httpClient.get(imageUrl, { responseType: 'text'});
  }
}