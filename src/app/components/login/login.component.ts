import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  isRegisterTab = false;
  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

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

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
  });
  get usernameInput() {
    return this.loginForm.get('username');
  }
  get passwordInput() {
    return this.loginForm.get('password');
  }

  registerForm: FormGroup = new FormGroup({
    regUsername: new FormControl('', [Validators.email, Validators.required]),
    regPassword: new FormControl('', [Validators.required, Validators.min(8)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    userImage: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });
  get regUsername() {
    return this.registerForm.get('regUsername');
  }
  get regPassword() {
    return this.registerForm.get('regPassword');
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get userImage() {
    return this.registerForm.get('userImage');
  }
  get gender() {
    return this.registerForm.get('gender');
  }

  logIn(): void {
    this.authService.emailSignIn(
      this.usernameInput?.value,
      this.passwordInput?.value
    );
  }

  register(): void {
    this.authService.emailSignUp(
      this.regUsername?.value,
      this.regPassword?.value,
      this.firstName?.value,
      this.lastName?.value,
      this.userImage?.value,
      this.gender?.value
    );
  }

  tabChange(event: MatTabChangeEvent): void {
    this.loginForm.reset();
  }

  googleLogIn(): void {
    this.authService.googleSignIn();
  }

  uploadFile(event: Event): void {
    event.stopPropagation();
    console.log(this.fileInput);
    this.userImage?.setValue('');
    const selectedFile = this.fileInput.nativeElement;
    let actualImage!: File;
    if (selectedFile.files && selectedFile.files[0]) {
      actualImage = selectedFile.files[0];
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      let imageData = reader.result;
      this.userImage?.setValue(`${actualImage.name}.${actualImage.type}`);
      console.log(imageData);
    };

    reader.readAsArrayBuffer(actualImage);
  }
}
