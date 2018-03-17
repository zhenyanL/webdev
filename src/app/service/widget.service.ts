import { Injectable } from '@angular/core';
import {Widget} from '../model/widget.model';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';


@Injectable()
export class WidgetService {

  // widgets =   [
  //   new Widget('123', 'HEADING', '321', '2', 'GIZMODO', '100%', 'url'),
  //   new Widget('234', 'HEADING', '321', '4', 'Lorem ipsum', '100%', 'url'),
  //   new Widget('345', 'IMAGE', '321', '4', 'text', '100%', 'http://lorempixel.com/400/200/'),
  //   new Widget('456', 'HTML', '321', '4', '<p>Lorem ipsum</p>', '100%', 'url'),
  //   new Widget('567', 'HEADING', '321', '4', 'Lorem ipsum', '100%', 'http://lorempixel.com/400/200/'),
  //   new Widget('678', 'YOUTUBE', '321', '4', 'text', '100%', 'https://www.youtube.com/embed/4jtVx4_QpKA'),
  //   new Widget('789', 'HTML', '321', '4', '<p>Lorem ipsum</p>', '100%', 'url'),
  // ];

  constructor(private http: Http) { }

  createWidget(name: string, widgetType: string, pageId: string, size: string, text: string, width: string, url: string,
               isFormatted: boolean) {
    // actually this should done in the server side
    // const id = Math.random().toString();
    // this.widgets.push(new Widget(id, widgetType, pageId, size, text, width, url));


    // '/api/page/:pageId/widget'
    const serverUrl = environment.baseUrl +     '/api/page/' + pageId + '/widget';
    return this.http.post(serverUrl, new Widget('', name, widgetType, pageId, size, text, width, url, isFormatted)).map(
      (response: Response) => {
        return response.json();
      }
    );
  }

  findWidgetByPageId(pageId: string) {
    //  const pageWidget = [];
    // this.widgets.forEach(function (widget) {
    //   if (widget.pageId === pageId) {
    //     pageWidget.push(widget);
    //   }
    // });
    // return pageWidget;
    const url = environment.baseUrl + '/api/page/' + pageId + '/widget';
    return this.http.get(url).map(
      (response: Response) => {
        return response.json();
      }
    );
  }


  // '/api/widget/:widgetId'
  findWidgetById(widgetId: string) {
    // const widgetFound = this.widgets.find(widget =>  widget.id === widgetId);
    // return new Widget(widgetFound.id, widgetFound.widgetType, widgetFound.pageId, widgetFound.size,
    //   widgetFound.text, widgetFound.width, widgetFound.url);
    const url = environment.baseUrl + '/api/widget/' + widgetId;
    return this.http.get(url).map(
      (response: Response) => {
        return response.json();
      }
    );
  }

  // '/api/widget/:widgetId'

  updateWidget(widgetId: string, newWidget: Widget) {
    // const index = this.widgets.findIndex(widget => widget.id === widgetId);
    // this.widgets[index] = newWidget;
    const url = environment.baseUrl + '/api/widget/' + widgetId;
    return this.http.put(url, newWidget).map(
      (response: Response) => {
        return response.json();
      }
    );
  }

  // '/api/widget/:widgetId'
  deleteWidget(widgetId: string) {
    // const index = this.widgets.findIndex(widget => widget.id === widgetId);
    // this.widgets.splice(index, 1);
    const url = environment.baseUrl + '/api/widget/' + widgetId;
    return this.http.delete(url).map(
      (response: Response) => {
        return response.json();
      }
    );
  }
  changeIndex(pageId: string, startIndex: number, endIndex: number) {

    // console.log(this.widgets[startIndex]);
    // console.log(this.widgets[endIndex]);
    // const temp = this.widgets[startIndex];
    // this.widgets[startIndex] = this.widgets[endIndex];
    // this.widgets[endIndex] = temp;
    // console.log(this.widgets[startIndex]);
    // console.log(this.widgets[endIndex]);
    // PUT /page/:pageId/widget?initial=index1&final=index2
    const url = environment.baseUrl + '/api/page/' + pageId + '/widget?initial=' + startIndex + '&final=' + endIndex;
    this.http.put(url, pageId).map(
      (response: Response) => {
        response.json();
      }
    ).subscribe(
      (data: any) => {});
  }
}
