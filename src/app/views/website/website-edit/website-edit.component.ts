import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../service/website.service';
import {Website} from '../../../model/website.model';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  id: string;
  website: Website;
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.id = param.wid;
        this.website = this.websiteService.findWebsiteById(this.id);
      }
    );
  }

  editWeb() {

  }


}
