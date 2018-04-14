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
    console.log(this.widget);
  }
  save() {
    const text = this.widgetForm.value.text;
    const rows = this.widgetForm.value.rows;
    const name = this.widgetForm.value.widgetName;
    const placeholder = this.widgetForm.value.placeholder;
    const isFormatted = this.widgetForm.value.widgetFormatted;
    if(name === ''){
      this.flag = true;
    } else {
      this.widgetService.updateWidget(this.widget._id, {id: this.widget._id, name: name, type: this.widget.type, pageId: this.widget.pageId, rows: rows, text: text, placeholder: placeholder, formatted: isFormatted}).subscribe(
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
