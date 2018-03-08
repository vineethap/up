﻿
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Auth } from './auth.service';
import { MatDialog } from '@angular/material';
import { NotSubscribedComponent } from '../content/apps/not-subscribed/not-subscribed.component'


@Injectable()
export class AuthGuard implements CanActivate {
  url_params: any;
  constructor(
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location, public dialog: MatDialog
  ) {}

  canActivate() {

    this.url_params = localStorage.getItem('url')

    let token = sessionStorage.getItem('currentUser');
    let __token = JSON.parse(token);

    // console.log(token.payment_status,"jkjl")
    let status = __token.payment_status
    if (this.auth.loggedIn()) {
      if (status == true) {

        return true;
      } else {
        this.router.navigate(['/' + this.url_params + '/subscription-management']);
        // this.dialog.open(NotSubscribedComponent, {
        //   panelClass: 'mail-compose-dialog',
        //   disableClose: true,
        //   hasBackdrop: true
        // });
      }
    } else {
      //window.location.href= this.base_url + '#/admin/login';
      this.router.navigate(['']);
      return false;
    }
  }
}
