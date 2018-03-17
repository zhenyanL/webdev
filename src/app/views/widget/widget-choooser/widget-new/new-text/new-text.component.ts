import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WidgetService} from '../../../../../service/widget.service';
import {NgForm} from '@angular/forms';
import {isFormattedError} from '@angular/compiler';

@Component({
  selector: 'app-new-text',
  templateUrl: './new-text.component.html',
  styleUrls: ['./new-text.component.css']
})
export class NewTextComponent implements OnInit {


  widgetId: string;
  userId: string;
  pageId: string;
  // isFormatted: boolean = false;
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
  //
  // checkBox(){
  //   isFormatted = !isFormatted;
  // }

  save() {
    const text = this.widgetForm.value.text;
    const size = this.widgetForm.value.widgetSize;
    const name = this.widgetForm.value.widgetName;
    const width = this.widgetForm.value.widgetWidth;
    const isFormatted = this.widgetForm.value.widgetFormatted;
    console.log(isFormatted);
    this.widgetService.createWidget(name, 'TEXT', this.pageId, size, text, width, 'url', isFormatted).subscribe(
      (data: any) => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }


}
