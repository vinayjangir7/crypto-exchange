import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeOption } from 'src/app/shared/models/theme-option.model';

@Component({
  selector: 'app-theme-menu',
  templateUrl: './theme-menu.component.html',
  styleUrls: ['./theme-menu.component.scss'],
})
export class ThemeMenuComponent implements OnInit {
  @Input() options: Array<ThemeOption> | null = [];
  @Output() themeChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  changeTheme(themeToSet: string) {
    this.themeChange.emit(themeToSet);
  }
}
