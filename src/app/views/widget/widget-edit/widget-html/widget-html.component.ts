import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Widget} from '../../../../model/widget.model';
import {WidgetService} from '../../../../service/widget.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {

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
  }
  save() {
    const text = this.widgetForm.value.htmlText;
    const name = this.widgetForm.value.widgetName;
    // const size = this.widgetForm.value.widgetSize;
    if(name === ''){
      this.flag = true;
    } else { this.widgetService.updateWidget(this.widget._id, {id: this.widget._id, name: name, type: this.widget.type, pageId: this.widget.pageId, text: text}).subscribe(
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
        this.router.navigate(['../'],  {relativeTo: this.activatedRoute});
      }
    );
  }


}
