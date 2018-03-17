import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WidgetService} from '../../../../../service/widget.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-html',
  templateUrl: './new-html.component.html',
  styleUrls: ['./new-html.component.css']
})
export class NewHtmlComponent implements OnInit {


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
    const htmlText = this.widgetForm.value.htmlText;
    const name = this.widgetForm.value.widgetName;
    // const size = this.widgetForm.value.widgetSize;
    this.widgetService.createWidget(name, 'HTML', this.pageId, '', htmlText, '100%', 'url', false).subscribe(
      (data: any) => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }


}
