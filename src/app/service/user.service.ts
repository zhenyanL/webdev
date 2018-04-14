import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {Http, Response, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {SharedService} from './shared.service';
import {Router} from '@angular/router';


@Injectable()
export class UserService {

  options = new RequestOptions();

  constructor(private http: Http, private sharedService: SharedService, private router: Router) { }

  login(userName: string, password: string) {
    this.options.withCredentials = true;
    const body = {
      username : userName,
      password : password
    };
    console.log('client server');
    return this.http.post(environment.baseUrl + '/api/login', body, this.options)
      .map(
        (res: Response) => {
          console.log('client server to client');
          const data = res.json();
          return data;
        }
      );

  }

  logOut() {
    this.options.withCredentials = true;
    return this.http.post(environment.baseUrl + '/api/logout', '', this.options)
      .map(
        (res: Response) => {
          const data = res;
        }
      );

  }

  register(username, password, firstname, lastname) {
    this.options.withCredentials = true;
    const user = {
      userName : username,
      password: password,
      firstName: firstname,
      lastName: lastname
    };
    return this.http.post(environment.baseUrl + '/api/register', user, this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  loggedIn() {
    this.options.withCredentials = true;
    return this.http.post(environment.baseUrl + '/api/loggedin', '', this.options)
      .map(
        (res: Response) => {
          const user = res.json();
          if (user !== 0) {
            this.sharedService.user = user;
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
  }

  createUser(userName: string, password: string, firstName: string, lastName: string) {
    // actually this should done in the server side
    // const id = Math.random().toString();
    // const user = new User(id, userName, password, firstName, lastName, '');
    // this.users.push(user);
    // return user;
    // http://localhost:3100/api/user
    // const id = Math.random().toString();
    // const user = new User(id, userName, password, firstName, lastName, '');
    const url =  environment.baseUrl + '/api/user';
    return this.http.post(url, {userName: userName, password : password, firstName : firstName , lastName: lastName})
      .map( (response: Response) => {
        return response.json();
      });
  }

  findUserById(userId: string) {
    const url =  environment.baseUrl + '/api/user/' + userId;
    console.log(url);
    return this.http.get(url).map(
      (response: Response) => {
        const data = response.json();
        console.log(data);
        return data;
      });
  }

  findUserByUsername(userName: string) {
    // return this.users.find(user =>  user.userName === userName);
  }

  findUserByCredentials(userName: string, password: string) {
    // return this.users.find(user => user.userName === userName && user.password === password);
    const url = environment.baseUrl + '/api/user?username=' + userName + '&password=' + password;
    return this.http.get(url).
    map(
      (response: Response) => {
        return response.text().length ? response.json() : null;
        // return response.json();
      });
  }
  updateUser(userId: string, user) {
    const url = environment.baseUrl + '/api/user/' + user._id;
    console.log('angular:' + url);
    return this.http.put(url, user).map((response: Response) => {
      return response.json();
    });
  }

  deleteUser(userId) {
    // const index = this.users.findIndex(user => user.id === userId);
    // this.users.splice(index, 1);
    console.log('front server get')
    const url = environment.baseUrl + '/api/user/' + userId;
    return this.http.delete(url).map((response: Response) => {
      console.log('front server back');
      return response.json();
    });
  }
}
