import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-not-subscribed',
  templateUrl: './not-subscribed.component.html',
  styleUrls: ['./not-subscribed.component.scss']
})
export class NotSubscribedComponent implements OnInit {
  show = false;
  url_params: any;
  constructor(
    public dialog: MatDialog,

    public dialogRef: MatDialogRef < NotSubscribedComponent > ,

    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.url_params = localStorage.getItem('url')
  }
  goto() {
    this.router.navigate(['/' + this.url_params + '/subscription-management']);
    this.dialogRef.close();

  }

}

