import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandleService {
  constructor(private snackBar: MatSnackBar) {}

  public handleError(error: HttpErrorResponse): Observable<never> {
    let errMsg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errMsg = error.error.message;
    } else {
      // server-side error
      errMsg = error.message;
    }

    this.snackBar.open(errMsg, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
    });
    return throwError(errMsg);
  }
}
