import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeOption } from 'src/app/shared/models/theme-option.model';
import { Theme } from 'src/app/shared/models/theme.model';
import { StyleManagerService } from 'src/app/shared/services/style-manager.service';
import { ThemeStorageService } from 'src/app/shared/services/theme-storage-service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  options$: Observable<Array<ThemeOption>> =
    this.themeService.getThemeOptions();

  currentTheme: Theme | undefined;
  themes: Theme[] = [
    {
      primary: '#673AB7',
      accent: '#FFC107',
      displayName: 'Deep Purple & Amber',
      name: 'deeppurple-amber',
      isDark: false,
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      displayName: 'Indigo & Pink',
      name: 'indigo-pink',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      displayName: 'Pink & Blue-grey',
      name: 'pink-bluegrey',
      isDark: true,
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      displayName: 'Purple & Green',
      name: 'purple-green',
      isDark: true,
    },
  ];

  constructor(
    private readonly themeStorageService: ThemeStorageService,
    private themeService: ThemeService,
    private styleManager: StyleManagerService
  ) {}

  ngOnInit() {
    const themeName = this.themeStorageService.getStoredThemeName();
    if (themeName) {
      this.selectTheme(themeName);
    } else {
      this.themes.find((theme: Theme) => {
        if (theme.isDefault === true) {
          this.selectTheme(theme.name);
        }
      });
    }
    /* this.themeService.setTheme('indigo-pink'); */
  }

  themeChangeHandler(themeToSet: string) {
    this.selectTheme(themeToSet);
  }

  selectTheme(themeName: string) {
    const theme = this.themes.find(
      (currentTheme) => currentTheme.name === themeName
    );

    if (!theme) {
      return;
    }

    this.currentTheme = theme;

    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `${theme.name}.css`);
    }

    if (this.currentTheme) {
      this.themeStorageService.storeTheme(this.currentTheme);
    }
  }
}
