import {Component, Input, OnInit} from '@angular/core';
import {Widget} from '../../../../model/widget.model';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  @Input() widget: Widget;
  constructor() { }

  ngOnInit() {
  }

  editeWidget() {

  }

}
