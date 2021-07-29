import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { FooterComponent } from './components/footer/footer.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TreeComponent } from './components/tree/tree.component';
import { MaterialModule } from './material.module';
import { ThemeStorageService } from './shared/services/theme/theme-storage-service';
import { ThemeService } from './shared/services/theme/theme.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AssetsComponent } from './components/crypto_components/assets/assets.component';
import { MarketsComponent } from './components/crypto_components/markets/markets.component';
import { ExchangeComponent } from './components/crypto_components/exchange/exchange.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    GalleryComponent,
    ProfileComponent,
    NotificationsComponent,
    MessagesComponent,
    AddressFormComponent,
    TreeComponent,
    DragDropComponent,
    NavigationComponent,
    LoginComponent,
    LogoutComponent,
    AssetsComponent,
    MarketsComponent,
    ExchangeComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    DragDropModule,
    OverlayModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [ThemeService, ThemeStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
