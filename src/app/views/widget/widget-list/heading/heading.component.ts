import {Component, Input, OnInit} from '@angular/core';
import {Widget} from '../../../../model/widget.model';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {
  @Input() widget: Widget;
  constructor() { }

  ngOnInit() {
  }

}
