import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Page} from '../../../model/page.model';
import {PageService} from '../../../service/page.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

class Param {
}

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {


  @ViewChild('newPageForm') newPageForm: NgForm;

  webId: string;
  userId: string
  errFlag = false;
  error = 'Enter the name of the Page';
  alert = '* Enter the Page name';

  constructor(private activatedRoute: ActivatedRoute,private pageService: PageService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.webId = param.wid;
        this.userId = param.uid;
      }
    );
  }

  createPage() {
    const name = this.newPageForm.value.pageName;
    if(name === ''){
      this.errFlag = true;
    } else {
      const title = this.newPageForm.value.pageTitle;
      this.pageService.createPage(this.webId, name, title).subscribe(
        (page: any) => {
          this.router.navigate(['user', this.userId, 'website', this.webId, 'page']);
        }
      );
    }

  }
}
