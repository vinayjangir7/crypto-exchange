import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeOption } from '../models/theme-option.model';
import { StyleManagerService } from './style-manager.service';

@Injectable()
export class ThemeService {
  constructor(
    private http: HttpClient,
    private styleManager: StyleManagerService
  ) {}

  getThemeOptions(): Observable<Array<ThemeOption>> {
    return this.http.get<Array<ThemeOption>>('assets/theme-options.json');
  }

  setTheme(themeToSet: string) {
    this.styleManager.setStyle(
      'theme',
      `node_modules/@angular/material/prebuilt-themes/${themeToSet}.css`
    );
  }
}
