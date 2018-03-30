import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../service/website.service';
import {Website} from '../../../model/website.model';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  id: string;
  website;
  @ViewChild('webEditForm') webEditForm: NgForm;
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.id = param.wid;
        this.websiteService.findWebsiteById(this.id).subscribe(
          (website: any) => {
            this.website = website;
          }
        );
      }
    );
  }

  editWeb() {
      const name = this.webEditForm.value.webName;
      const description = this.webEditForm.value.description;
      this.websiteService.updateWebsite(this.id,
        {id: this.id, name: name, pages: this.website.pages, userId: this.website.userId, description: description}).subscribe(
        (website: Website) => {
          alert( 'save successfully');
          this.router.navigate(['/user', this.website.userId, 'website']);
        }
      );
  }

  deleteWeb() {
    this.websiteService.deleteWebsite(this.id).subscribe(
      (website: Website) => {
        this.router.navigate(['../'],{relativeTo: this.activatedRoute});
      }
    );
  }


}
