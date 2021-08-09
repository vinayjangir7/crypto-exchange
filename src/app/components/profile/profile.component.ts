import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  panelOpenState = true;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  get user(): Observable<User | null | undefined> {
    return this.authService.user$;
  }
}
