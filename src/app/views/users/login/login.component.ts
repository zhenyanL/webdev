import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;

  ngOnInit() {
  }
  constructor(private router: Router){};
  login(username: string, password: string){
    console.log('navigat to profile');
    this.router.navigate(['/profile']);
  }
  register(){
    this.router.navigate(['/login']);
  }

}
