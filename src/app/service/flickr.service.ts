import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class FlickrService {

  key = '97cf701103b81d1dfcf902b1d712fce9';
  secret = '0eef730bd728a467';
  constructor(private http: Http) { }

  searchPhoto(searchContent: any) {
    const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search' +
      '&api_key=' + this.key + '&format=json&text=' + searchContent;
    return this.http.get(url);
  }
}
