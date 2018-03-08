import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material';


@Component({
  selector: 'app-sample-stripe',
  templateUrl: './sample-stripe.component.html',
  styleUrls: ['./sample-stripe.component.scss']
})
export class SampleStripeComponent implements OnInit {
  url_params: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.url_params = localStorage.getItem('url');

    this.router.navigate(['/' + this.url_params + '/store-management']);


  }

}
