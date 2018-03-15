import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {WidgetService} from '../../../service/widget.service';
import {Widget} from '../../../model/widget.model';
import {WebsiteService} from '../../../service/website.service';
import {PageService} from '../../../service/page.service';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  pageId: string;
  widgets: Widget[];
  userId: string;
  webId: string;
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private pageService: PageService, private webService: WebsiteService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.pageId = param.pid;
         this.widgetService.findWidgetByPageId(this.pageId).subscribe(
          (widgets: Widget[]) => {
            this.widgets = widgets;
          }
        );
        this.userId = param.uid;
        this.webId = param.wid;
      }
    );
  }

  newIndexes(index) {
    this.widgetService.changeIndex(this.pageId, index.startIndex, index.endIndex);
  }

}
