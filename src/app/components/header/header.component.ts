import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderConfigs, IHeader } from 'src/app/shared/config/header-config';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  HEADERS: IHeader[] = HeaderConfigs;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  get headers(): IHeader[] {
    return this.HEADERS;
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }

  get user(): Observable<User | null | undefined> {
    return this.authService.user$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logOut(): void {
    this.authService.logOut();
  }
}
