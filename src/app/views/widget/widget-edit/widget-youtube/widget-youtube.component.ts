import {Component, Input, OnInit} from '@angular/core';
import {Widget} from '../../../../model/widget.model';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  @Input() widget: Widget;
  constructor() { }

  ngOnInit() {
  }

}
