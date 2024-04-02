import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private http: HttpClient) {}

  private BASE_URL: string = 'http://localhost:8000/api/';
  postWeedDetection(file: File) {
    const fd = new FormData();
    fd.append('image', file, file.name);

    return this.http.post(this.BASE_URL + 'weed', fd);
  }
  postDiseaseDetection(file: File) {
    const fd = new FormData();
    fd.append('image', file, file.name);

    return this.http.post(this.BASE_URL + 'disease', fd);
  }
  postMaturityDetection(file: File) {
    const fd = new FormData();
    fd.append('image', file, file.name);

    return this.http.post(this.BASE_URL + 'maturity', fd);
  }
}
