import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Widget} from '../../../../model/widget.model';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {WidgetService} from '../../../../service/widget.service';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  @Input() widget: Widget;
  @ViewChild('widgetForm') widgetForm: NgForm;
  constructor() { }

  ngOnInit() {
  }
  editWidget() {
    const text = this.widgetForm.value.widgetText;
    const size = this.widgetForm.value.widgetSize;
  }

}
