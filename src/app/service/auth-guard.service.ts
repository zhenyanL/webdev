import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private userService: UserService, private route: Router) { }

  canActivate() {
    return this.userService.loggedIn();
  }

}
