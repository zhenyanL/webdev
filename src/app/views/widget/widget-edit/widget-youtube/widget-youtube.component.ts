import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Widget} from '../../../../model/widget.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../../service/widget.service';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  @Input() widget: any;
  @ViewChild('widgetForm') widgetForm: NgForm;
  userId: string;
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.userId = param.uid;
      }
    );
  }
  save() {
    const text = this.widgetForm.value.widgetText;
    const width = this.widgetForm.value.width;
    const name = this.widgetForm.value.widgetName;
    const url = this.widgetForm.value.url;
    this.widgetService.updateWidget(this.widget._id, {id: this.widget._id, name: name,
      type: this.widget.type, pageId: this.widget.pageId, width: width, url: url, text: text}).subscribe(
      (widget: Widget) => {
        alert( 'save successfully');
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widget._id).subscribe(
      (data: any) => {
        this.router.navigate(['../'],  {relativeTo: this.activatedRoute});
      }
    );
  }
}
