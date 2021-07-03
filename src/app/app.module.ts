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
import { ProfileComponent } from './components/profile/profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TreeComponent } from './components/tree/tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    GalleryComponent,
    ThemeMenuComponent,
    ProfileComponent,
    NotificationsComponent,
    MessagesComponent,
    DashboardComponent,
    AddressFormComponent,
    TableComponent,
    TreeComponent,
    DragDropComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    DragDropModule,
  ],
  providers: [StyleManagerService, ThemeService, ThemeStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
