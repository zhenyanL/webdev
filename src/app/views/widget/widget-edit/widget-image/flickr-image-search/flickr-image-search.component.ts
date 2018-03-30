import { Component, OnInit } from '@angular/core';
import {FlickrService} from '../../../../../service/flickr.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WidgetService} from '../../../../../service/widget.service';

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  searchContent: String;
  photos: any;
  userId;
  websiteId;
  pageId;
  widgetId;
  constructor(private currentRoute: ActivatedRoute, private flickrService: FlickrService, private widgetService: WidgetService,
              private router: Router) { }

  ngOnInit() {
    this.currentRoute.params.subscribe(
      (param: Params) => {
        this.widgetId = param.wdid;
        this.userId = param.uid;
        this.websiteId = param.wid;
        this.pageId = param.pid;
      }
    );
  }


  searchPhoto() {
    this.flickrService.searchPhoto(this.searchContent).subscribe(
      (data: any) => {
        console.log(data);
        let val = data._body;
        val = val.replace('jsonFlickrApi(', '');
        val = val.substring(0, val.length - 1);
        val = JSON.parse(val);
        console.log(val);
        this.photos = val.photos;

      }
    );
  }

  selectPhoto(photo) {
    const url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' +   photo.id + '_' + photo.secret + '_s.jpg';
    this.widgetService.findWidgetById(this.widgetId).subscribe(
      (widget: any) => {
        widget.url = url;
        this.widgetService.updateWidget(this.widgetId, widget).subscribe(
          (data: any) => {
          this.router.navigate(
            ['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + this.widgetId]);
        }
        );
      }
    );
  }
}
