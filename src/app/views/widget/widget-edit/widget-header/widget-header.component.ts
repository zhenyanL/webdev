import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Widget} from '../../../../model/widget.model';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WidgetService} from '../../../../service/widget.service';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  @Input() widget: any;
  @ViewChild('widgetForm') widgetForm: NgForm;
  userId: string;
  flag = false;
  error = 'Enter the name of the widget';
  alert = '* Enter the widget name';
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.userId = param.uid;
      }
    );
    console.log(this.widget.name);
  }
  save() {
    const text = this.widgetForm.value.widgetText;
    const size = this.widgetForm.value.widgetSize;
    const name = this.widgetForm.value.widgetName;
    if(name === '') {
      this.flag = true;
    } else{
      console.log('id before send to back end' + this.widget._id);
      this.widgetService.updateWidget(this.widget._id, { id:  this.widget._id, name: name, type: this.widget.type,
        pageId: this.widget.pageId, size: size, text: text} ).subscribe(
        (widget: any) => {
          alert( 'save successfully');
          console.log('id after send to back end' + widget._id);
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        }
      );
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widget._id).subscribe(
      (data: any) => {
        this.router.navigate(['../'],  {relativeTo: this.activatedRoute});
      }
    );
  }

}
