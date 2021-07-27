import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  isRegisterTab = false;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    this.matIconRegistry.addSvgIcon(
      `google`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/images/svg/google.svg'
      )
    );
  }

  ngOnInit(): void {}

  logInForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
  });
  get usernameInput() {
    return this.logInForm.get('username');
  }
  get passwordInput() {
    return this.logInForm.get('password');
  }

  logIn(): void {
    this.authService.emailSignIn(
      this.usernameInput?.value,
      this.passwordInput?.value
    );
  }

  register(): void {
    this.authService.emailSignUp(
      this.usernameInput?.value,
      this.passwordInput?.value
    );
  }

  tabChange(event: MatTabChangeEvent): void {
    this.logInForm.reset();
  }

  googleLogIn(): void {
    this.authService.googleSignIn();
  }
}
