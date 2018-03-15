import { Injectable } from '@angular/core';
import {Page} from '../model/page.model';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()
export class PageService {

  // pages: Page[] = [
  //   new Page('321', 'Post 1', '456', 'Lorem'),
  //   new Page('432', 'Post 2', '456', 'Lorem'),
  //   new Page('543', 'Post 3', '456', 'Lorem')
  // ];


  constructor(private http: Http) { }



  createPage(websiteId: string, name: string, title: string) {
    // actually this should done in the server side
    // const id = Math.random().toString();
    // this.pages.push(new Page(id, name, websiteId, title));
    const url = environment.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.post(url,new Page('', name, websiteId, title)).map(
      (response: Response) => {
        return response.json();
      }
    );
  }

  findPageByWebsiteId(websiteId: string) {
    // const webPages = [];
    // this.pages.forEach(function (page) {
    //   if (page.websiteId === websiteId) {
    //     webPages.push(page);
    //   }
    // });
    // return webPages;
    const url = environment.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.get(url).map(
      (response: Response) => {
        return response.json();
      }
    );
  }

  findPageById(pageId: string) {
    // const page = this.pages.find(page =>  page.id === pageId);
    // return new Page(page.id, page.name, page.websiteId, page.title);
    const url = environment.baseUrl + '/api/page/' + pageId;
    return this.http.get(url).map(
      (response: Response) => {
        return response.json();
      }
    );
  }

  updatePage(pageId: string, newPage: Page) {
    // const index = this.pages.findIndex(page => page.id === pageId);
    // this.pages[index] = newPage;
    // '/api/page/:pageId'
    const url = environment.baseUrl + '/api/page/' + pageId;
    return this.http.put(url, newPage).map(
      (response: Response) => {
        return response.json();
      }
    );
  }
  deletePage(pageId: string) {
    // const index = this.pages.findIndex(page => page.id === pageId);
    // this.pages.splice(index, 1);

    //
    // /api/page/:pageId
    const url = environment.baseUrl + '/api/page/' + pageId;
    return this.http.delete(url).map(
      (response: Response) => {
        return response.json();
      }
    );
  }
}
