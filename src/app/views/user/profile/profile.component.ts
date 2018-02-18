import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  user: User;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = param.uid;
        this.user = this.userService.findUserById(this.id);
        console.log(this.user);
      }
    );

  }
  logout() {

  }

  toWebsite() {
    this.router.navigate(['website'], {relativeTo: this.route});
    // this.router.navigate(['user', this.id, 'website']);
  }

}
