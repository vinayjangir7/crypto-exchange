import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './material.module';
import { GalleryComponent } from './components/gallery/gallery.component';
import { StyleManagerService } from './shared/services/style-manager.service';
import { ThemeMenuComponent } from './components/theme-menu/theme-menu.component';
import { ThemeService } from './shared/services/theme.service';
import { HttpClientModule } from '@angular/common/http';
import { ThemeStorageService } from './shared/services/theme-storage-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    GalleryComponent,
    ThemeMenuComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [StyleManagerService, ThemeService, ThemeStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
