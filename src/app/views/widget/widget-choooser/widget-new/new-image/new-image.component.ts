import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../../../service/widget.service';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css']
})
export class NewImageComponent implements OnInit {

  widgetId: string;
  userId: string;
  pageId: string;
  websiteId: string;
  baseUrl: string = environment.baseUrl;
  @ViewChild('widgetForm') widgetForm: NgForm;
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.widgetId = param.wdid;
        this.userId = param.uid;
        this.pageId = param.pid;
        this.websiteId = param.wid;
      }
    );
  }
  save() {
    const text = this.widgetForm.value.widgetText;
    const width = this.widgetForm.value.width;
    const url = this.widgetForm.value.url;
    const name = this.widgetForm.value.widgetName;
    this.widgetService.createWidget( name, 'IMAGE', this.pageId, '4', text, width, url).subscribe(
      (data: any) => {
        this.router.navigate(['../'],{relativeTo: this.activatedRoute});
      }
    );
  }

}
