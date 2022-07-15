import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { ErrorHandleService } from '../error-handler/error-handle.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private aFireStore: AngularFirestore,
    private router: Router,
    private errorService: ErrorHandleService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.aFireStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return errorService.handleError(error);
      })
    );
  }

  async googleSignIn(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth
      .signInWithPopup(provider)
      .catch((error: HttpErrorResponse) => {
        this.errorService.handleError(error);
      });
    this.router.navigate(['/exchange']);
    if (credential) {
      this.updateUserData(credential.user);
    }
  }

  async emailSignIn(email: string, password: string): Promise<void> {
    const credential = await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .catch((error: HttpErrorResponse) => {
        this.errorService.handleError(error);
      });
    this.router.navigate(['/exchange']);
    if (credential) {
      this.updateUserData(credential.user);
    }
  }

  async emailSignUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userImage: any,
    gender: string
  ): Promise<void> {
    const credential: firebase.auth.UserCredential | void = await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .catch((error: HttpErrorResponse) => {
        this.errorService.handleError(error);
      });
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
    if (credential) {
      this.updateUserData(credential.user);
    }
  }

  private updateUserData(user: firebase.User | null): void {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.aFireStore.doc(
      `users/${user!.uid}`
    );

    const data: User = {
      uid: user!.uid,
      email: user!.email,
      displayName: user!.displayName,
      photoURL: user!.photoURL,
    };

    userRef.set(data, { merge: true }).catch((error: HttpErrorResponse) => {
      return this.errorService.handleError(error);
    });
  }

  async logOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
