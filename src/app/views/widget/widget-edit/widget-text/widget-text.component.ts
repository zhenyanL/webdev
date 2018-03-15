import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Widget} from '../../../../model/widget.model';
import {WidgetService} from '../../../../service/widget.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {
  @Input() widget: Widget;
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
    const text = this.widgetForm.value.text;
    const size = this.widgetForm.value.widgetSize;
    this.widgetService.updateWidget(this.widget.id, new Widget(this.widget.id, this.widget.widgetType,
      this.widget.pageId, size, text, this.widget.width, this.widget.url)).subscribe(
      (widget: Widget) => {
        alert( 'save successfully');
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widget.id).subscribe(
      (data: any) => {
        this.router.navigate(['../'],  {relativeTo:this.activatedRoute});
      }
    );
  }


}
