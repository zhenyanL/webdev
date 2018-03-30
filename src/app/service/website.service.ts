import { Injectable } from '@angular/core';
import {Website} from '../model/website.model';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
// // import {environment} from  '../../environments/environment' ;
// import {environment} from '../../environments/environment';
import {environment} from '../../environments/environment';

@Injectable()
export class WebsiteService {


constructor(private http: Http) { }




  createWebsite(website) {
    // const id = Math.random().toString();
    // this.websites.push(new Website(id, name, userId, description));
    const url = environment.baseUrl + '/api/user/' + website.userId + '/website';
    return this.http.post(url, website).map(
      (response: Response) => {
        return response.json();
      }
    );
  }

  findWebsitesByUser(userId: string) {
    // const userWeb = [];
    // this.websites.forEach(function (website) {
    //   if (website.developerId === userId) {
    //     userWeb.push(website);
    //   }
    // });
    // return userWeb;
    const url = environment.baseUrl + '/api/user/' + userId + '/website';
    return this.http.get(url).map(
      (response: Response) => {
        return response.json();
      }
    );
  }

  findWebsiteById(websiteId: string) {
    // const web = this.websites.find(website => website.id === websiteId);
    // return new Website(web.id, web.name, web.developerId, web.description);

    const url = environment.baseUrl + '/api/website/' + websiteId;
    return this.http.get(url).map(
      (response: Response) => {
        return response.json();
      }
    );
  }

  updateWebsite(websiteId: string, newWebsite) {

    // const index: number = this.websites.findIndex(website => website.id === websiteId);
    // this.websites[index] = newWebsite;
    const url = environment.baseUrl + '/api/website/' + websiteId;
    return this.http.put(url, newWebsite).map(
      (response: Response) => {
        return response.json();
      }
    );
  }
  deleteWebsite(websiteId: string) {
    // const index: number = this.websites.findIndex(website => website.id === websiteId);
    // this.websites.splice(index, 1);
    const url = environment.baseUrl + '/api/website/' + websiteId;
    return this.http.delete(url).map(
      (response: Response) => {
        return response.json();
      }
    );
  }




}
