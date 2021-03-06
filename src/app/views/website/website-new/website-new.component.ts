import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WebsiteService} from '../../../service/website.service';
import {Website} from '../../../model/website.model';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  flag = false;
  error = 'Enter the name of the website';
  alert = '* Enter the website name';

  @ViewChild('newWebForm') newWebForm: NgForm;
  constructor(private activatedRoute: ActivatedRoute, private webService: WebsiteService, private router: Router) { }

  developerId: string;
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.developerId = param.uid;
      }
    );
  }

  createWeb() {
    const name = this.newWebForm.value.webName;
    if (name === ''){
      this.flag = true;
    }
    else{
      const description = this.newWebForm.value.description;
      const website = new Website('', name, this.developerId, description);
      this.webService.createWebsite({userId: this.developerId, name: name,  description: description}).subscribe(
        (data: any) => {
          this.router.navigate(['user', this.developerId, 'website']);
        }
      );
    }
  }

}
