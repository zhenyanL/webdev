import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {WidgetService} from '../../../service/widget.service';
import {Widget} from '../../../model/widget.model';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  pageId: string;
  widgets: Widget[];
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.pageId = param.pid;
        this.widgets = this.widgetService.findWidgetByPageId(this.pageId);
      }
    );
  }

}
