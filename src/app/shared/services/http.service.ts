import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  url = environment.endPoint.concat(environment.version);

  get<T>(route: string): Observable<T> {
    return this.http
      .get<T>(this.url.concat(route))
      .pipe(map((response: any) => response.data));
  }

  post<T>(route: string, body: T): Observable<T> {
    return this.http.post<T>(this.url.concat(route), body);
  }
}
