import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorHandleService } from './error-handler/error-handle.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorHandleService
  ) {}

  url = environment.endPoint.concat(environment.version);

  get<T>(route: string): Observable<T> {
    return this.http.get<T>(this.url.concat(route)).pipe(
      map((response: any) => response.data),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        console.log(error.status);
        this.errorService.handleError(error);
        return throwError(error.message);
      })
    );
  }

  post<T>(route: string, body: T): Observable<T> {
    return this.http.post<T>(this.url.concat(route), body);
  }
}
