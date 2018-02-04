import { Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './views/users/login/login.component';
import {ProfileComponent} from './views/users/profile/profile.component';
import {RegisterComponent} from './views/users/register/register.component';

//const do not change
const appRoutes : Routes =[
  //if your url is login go to LoginComponent
  {path:'login',component: LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path:'register', component:RegisterComponent}

];

export const routing = RouterModule.forRoot(appRoutes);
