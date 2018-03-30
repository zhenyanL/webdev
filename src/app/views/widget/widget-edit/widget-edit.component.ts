import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Widget} from '../../../model/widget.model';
import {WidgetService} from '../../../service/widget.service';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  widgetId: string;
  widget: any;
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.widgetId = param.wdid;
         this.widgetService.findWidgetById(this.widgetId).subscribe(
          (widget: any) => {
            this.widget = widget;
          }
        );
      }
    );
  }

}
