import { Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './views/user/login/login.component';
import {ProfileComponent} from './views/user/profile/profile.component';
import {RegisterComponent} from './views/user/register/register.component';
import {WebsiteListComponent} from './views/website/website-list/website-list.component';
import {WebsiteNewComponent} from './views/website/website-new/website-new.component';
import {WebsiteEditComponent} from './views/website/website-edit/website-edit.component';
import {PageListComponent} from './views/page/page-list/page-list.component';
import {PageNewComponent} from './views/page/page-new/page-new.component';
import {PageEditComponent} from './views/page/page-edit/page-edit.component';
import {WidgetListComponent} from './views/widget/widget-list/widget-list.component';
import {WidgetChoooserComponent} from './views/widget/widget-choooser/widget-choooser.component';
import {WidgetEditComponent} from './views/widget/widget-edit/widget-edit.component';
import {WidgetNewComponent} from './views/widget/widget-choooser/widget-new/widget-new.component';
import {FlickrImageSearchComponent} from './views/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuardService} from './service/auth-guard.service'

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // {path: 'user/:uid', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'user/:uid/website', component: WebsiteListComponent, canActivate: [AuthGuardService]},
  {path: 'user/:uid/website/new', component: WebsiteNewComponent, canActivate: [AuthGuardService]},
  {path: 'user/:uid/website/:wid', component: WebsiteEditComponent, canActivate: [AuthGuardService]},
  {path: 'user/:uid/website/:wid/page', component: PageListComponent, canActivate: [AuthGuardService]},
  {path: 'user/:uid/website/:wid/page/new', component: PageNewComponent, canActivate: [AuthGuardService]},
  {path: 'user/:uid/website/:wid/page/:pid', component: PageEditComponent, canActivate: [AuthGuardService]},
  {path: 'user/:uid/website/:wid/page/:pid/widget', component: WidgetListComponent, canActivate: [AuthGuardService]},
  {path: 'user/:uid/website/:wid/page/:pid/widget/new', component: WidgetChoooserComponent, canActivate: [AuthGuardService]},
  {path: 'user/:uid/website/:wid/page/:pid/widget/new/:part', component: WidgetNewComponent, canActivate: [AuthGuardService]},
  {path: 'user/:uid/website/:wid/page/:pid/widget/:wdid', component: WidgetEditComponent, canActivate: [AuthGuardService]},
  {path: 'user/:uid/website/:wid/page/:pid/widget/:wdid/flickr', component: FlickrImageSearchComponent, canActivate: [AuthGuardService]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
