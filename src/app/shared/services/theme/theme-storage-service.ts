import { Injectable } from '@angular/core';

@Injectable()
export class ThemeStorageService {
  static storageKey = 'current-theme';

  storeTheme(theme: string) {
    try {
      window.localStorage[ThemeStorageService.storageKey] = theme;
    } catch {}
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
