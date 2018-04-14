import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Widget} from '../../../../model/widget.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../../service/widget.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  @Input() widget: any;
  @ViewChild('widgetForm') widgetForm: NgForm;
  userId: string;
  pageId: string;
  websiteId: string;
  baseUrl: string = environment.baseUrl;
  widgetId;
  flag = false;
  error = 'Enter the name of the widget';
  alert = '* Enter the widget name';
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.userId = param.uid;
        this.pageId = param.pid;
        this.websiteId = param.wid;
        this.widgetId = param.wdid;
      }
    );
    console.log(this.widget.name);
  }

  save() {
    const text = this.widgetForm.value.text;
    // const size = this.widgetForm.value.widgetSize;
    const name = this.widgetForm.value.widgetName;
    const width = this.widgetForm.value.width;
    const url = this.widgetForm.value.url;
    // console.log('save here');
    if(name === ''){
      this.flag = true;
    } else{
      this.widgetService.updateWidget(this.widget._id,{id: this.widget._id,
        name: name, type: this.widget.type, pageId: this.widget.pageId, width: width, text: text, url: url}).subscribe(
        (widget: any) => {
          alert( 'save successfully');
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        }
      );
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widget._id).subscribe(
      (data: any) => {
        this.router.navigate(['../'],  {relativeTo:this.activatedRoute});
      }
    );
  }

}
