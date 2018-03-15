import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';


@Injectable()
export class UserService {


  constructor(private http: Http) { }
  createUser(userName: string, password: string, firstName: string, lastName: string) {
    // actually this should done in the server side
    // const id = Math.random().toString();
    // const user = new User(id, userName, password, firstName, lastName, '');
    // this.users.push(user);
    // return user;
    // http://localhost:3100/api/user
    const id = Math.random().toString();
    const user = new User(id, userName, password, firstName, lastName, '');
    const url =  environment.baseUrl + '/api/user';
    return this.http.post(url, user)
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
    const url = environment.baseUrl + '/api/user/' + user.id;
    console.log('angular:' + url);
    return this.http.put(url, user).map((response: Response) => {
      return response.json();
    });
  }

  deleteUser(userId: string) {
    // const index = this.users.findIndex(user => user.id === userId);
    // this.users.splice(index, 1);
  }
}
