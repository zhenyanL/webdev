import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WidgetService} from '../../../service/widget.service';

@Component({
  selector: 'app-widget-choooser',
  templateUrl: './widget-choooser.component.html',
  styleUrls: ['./widget-choooser.component.css']
})
export class WidgetChoooserComponent implements OnInit {

  // defaultWidgetValues =
  //   {
  //     'Header': {type: 'Header', 'size' : 1},
  //     'Image': {type: 'Image', width: '100%'},
  //     'Youtube': {type: 'YouTube', width: '100%'},
  //     'Html': {type: 'HTML'},
  //     'Text': {type: 'Text', placeholder: ''}
  //   };
  userId: string;
  pageId;
  websiteId;
  widgetsChooser = ['HEADING', 'LABEL', 'HTML', 'TEXT', 'LINK', 'BUTTON', 'IMAGE', 'YOUTUBE', 'DATA', 'REPEATER'];
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.userId = param.uid;
        this.pageId = param.pid;
        this.websiteId = param.wid;
      }
    );
  }


  createWidget(widgetName) {
    // const widget = this.defaultWidgetValues[widgetName];
    // this.widgetService.createWidget('', widgetName, this.pageId, '', '', '', '', false)
    this.widgetService.createWidget({type: widgetName, pageId: this.pageId})
      .subscribe(
        (data: any) => {
          // this.widgetId = data._id;
          const widgetId = data._id;
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget', widgetId]);
        }
      );
  }
}
