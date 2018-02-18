import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {PageService} from '../../../service/page.service';
import {Page} from '../../../model/page.model';

class Param {
}

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  @ViewChild('editPageForm') editPageForm: NgForm;

  pageId: string
  page: Page;
  constructor(private activatedRoute: ActivatedRoute,private pageService: PageService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.pageId = param.pid;
        this.page = this.pageService.findPageById(this.pageId);
        console.log(this.page);
      }
    );
  }

  editPage() {

  }

}
