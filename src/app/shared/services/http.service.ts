import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  url = environment.endPoint.concat(environment.version);

  get<T>(route: string): Observable<T> {
    return this.http.get<T>(this.url.concat(route));
  }

  post<T>(route: string, body: T): Observable<T> {
    return this.http.post<T>(this.url.concat(route), body);
  }
}
