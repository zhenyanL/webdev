import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../service/website.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Website} from '../../../model/website.model';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {
  id: string;
  websiteList: any[];
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.id = param.uid;
         this.websiteService.findWebsitesByUser(this.id).subscribe(
          (websites: any[]) => {
            this.websiteList = websites;
          }
        );
      }
    );
  }
  clickPage(website: Website) {
    this.router.navigate(['/user', this.id, 'website', website._id, 'page']);
  }
}
