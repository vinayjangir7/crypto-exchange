import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Theme } from '../models/theme.enum';
import { ThemeStorageService } from './theme-storage-service';

@Injectable()
export class ThemeService {
  isDarkMode = false;
  darkModeVisibilityChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    private overlayContainer: OverlayContainer,
    private themeStorageService: ThemeStorageService
  ) {
    const themeName = themeStorageService.getStoredThemeName();
    if (themeName) {
      this.isDarkMode = themeName == Theme.DARK_THEME ? true : false;
      this.setOverlayContainerTheme(themeName);
    }
    this.darkModeVisibilityChange.subscribe((value: boolean) => {
      this.isDarkMode = value;
    });
  }

  /**
   * Toggling the theme on user input
   *
   * @memberof ThemeService
   */
  toggleTheme(): void {
    this.darkModeVisibilityChange.next(!this.isDarkMode);
    const theme = this.isDarkMode ? Theme.DARK_THEME : Theme.LIGHT_THEME;
    this.setOverlayContainerTheme(theme);
    this.themeStorageService.storeTheme(theme);
  }
  /**
   * Setting theme for overlay angular material components
   *
   * @private
   * @param {string} theme
   * @memberof ThemeService
   */
  private setOverlayContainerTheme(theme: string) {
    if (this.overlayContainer.getContainerElement().classList.contains(theme)) {
      this.overlayContainer
        .getContainerElement()
        .classList.remove(Theme.DARK_THEME);
      this.overlayContainer
        .getContainerElement()
        .classList.remove(Theme.LIGHT_THEME);
    }
    this.overlayContainer.getContainerElement().classList.add(theme);
  }
}
