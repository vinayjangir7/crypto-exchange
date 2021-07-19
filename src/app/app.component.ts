import { Component, OnChanges, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'App';

  constructor(private themeService: ThemeService) {}

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }
}
