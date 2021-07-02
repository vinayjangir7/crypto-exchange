import { EventEmitter, Injectable } from '@angular/core';
import { Theme } from '../models/theme.model';

@Injectable()
export class ThemeStorageService {
  static storageKey = 'current-theme';

  onThemeUpdate: EventEmitter<Theme> = new EventEmitter<Theme>();

  storeTheme(theme: Theme) {
    try {
      window.localStorage[ThemeStorageService.storageKey] = theme.name;
    } catch {}

    this.onThemeUpdate.emit(theme);
  }

  getStoredThemeName(): string | null {
    try {
      return window.localStorage[ThemeStorageService.storageKey] || null;
    } catch {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorageService.storageKey);
    } catch {}
  }
}
