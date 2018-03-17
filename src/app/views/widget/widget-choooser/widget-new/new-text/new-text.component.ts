import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WidgetService} from '../../../../../service/widget.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-text',
  templateUrl: './new-text.component.html',
  styleUrls: ['./new-text.component.css']
})
export class NewTextComponent implements OnInit {


  widgetId: string;
  userId: string;
  pageId: string;
  @ViewChild('widgetForm') widgetForm: NgForm;
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.widgetId = param.wdid;
        this.userId = param.uid;
        this.pageId = param.pid;
        console.log(this.widgetId);
        console.log(this.userId);
        console.log(this.pageId);
      }
    );
  }
  save() {
    const text = this.widgetForm.value.text;
    const size = this.widgetForm.value.widgetSize;
    const name = this.widgetForm.value.widgetName;
    this.widgetService.createWidget(name, 'TEXT', this.pageId, size, text, '100%', 'url').subscribe(
      (data: any) => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }


}
