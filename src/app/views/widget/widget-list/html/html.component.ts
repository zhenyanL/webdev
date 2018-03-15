import {Component, Input, OnInit} from '@angular/core';
import {Widget} from '../../../../model/widget.model';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.css']
})
export class HtmlComponent implements OnInit {
  @Input() widget: Widget;


  pageId: string;
  userId: string;
  webId: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.pageId = param.pid;
        this.webId = param.wid;
        this.userId = param.uid;
      }
    );
  }
}
