import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user.model';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  userName: string;
  password: string;
  matched = true;
  baseUrl = environment.baseUrl;

  ngOnInit() {
  }
  constructor(private router: Router, private userService: UserService) {}
  // login() {
  //   const name = this.loginForm.value.userName;
  //   const password = this.loginForm.value.password;
  //   this.userService.findUserByCredentials(name, password).
  //     subscribe(
  //     ( user: User) => {
  //       if (user) {
  //         this.router.navigate(['/user', user._id]);
  //       } else {
  //         this.matched = false;
  //         console.log(this.matched);
  //       }
  //     }
  //   );
  //   //you cannot do like this,, http is a asynchronous server
  //   // if (this.user != null) {
  //   //   this.router.navigate(['/user', this.user.id]);
  //   // } else {
  //   //   this.matched = false;
  //   // }
  // }

  login() {

    // fetching data from loginForm
    // this.username = this.loginForm.value.username;
    // this.password = this.loginForm.value.password;
    const name = this.loginForm.value.userName;
    const password = this.loginForm.value.password;

    // calling client side userservice to send login information
    this.userService.login(name, password)
      .subscribe(
        (data: any) => {
          // this.sharedService.user = data;
          // this.router.navigate(['/profile'])
          // this.router.navigate(['/user', data._id]);
          this.router.navigate(['/profile']);
        },
        (error: any) => {
          this.matched = false;
          console.log(error);
        }
      );
  }
  // register() {
  //   this.router.navigate(['/login']);
  // }

}
