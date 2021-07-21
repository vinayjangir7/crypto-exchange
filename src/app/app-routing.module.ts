import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { ExchangeComponent } from './components/crypto_components/exchange/exchange.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TreeComponent } from './components/tree/tree.component';

const routes: Routes = [
  { path: '', component: ExchangeComponent },
  /* { path: 'gallery', component: GalleryComponent }, */
  { path: 'profile', component: ProfileComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'address', component: AddressFormComponent },
  { path: 'drag-drop', component: DragDropComponent },
  { path: 'tree', component: TreeComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
