import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatInputModule, MatSnackBar } from '@angular/material';

import { Topic } from '../../../../../core/sdk/models/Topic';
import { TopicApi } from '../../../../../core/sdk/services/custom/Topic';
import { TopicTypeApi } from '../../../../../core/sdk/services/index';

@Component({
  selector: 'app-deletetopic',
  templateUrl: './deletetopic.component.html',
  styleUrls: ['./deletetopic.component.scss']
})
export class DeletetopicComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    public topicApi: TopicApi,
    public topicTypeApi: TopicTypeApi,
    public dialogRef: MatDialogRef < DeletetopicComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {}

  onSubmit(topic) {

    this.topicApi.deleteById(topic.id)
      .subscribe(
        data => {

          this.topicTypeApi.deleteAllSubTopics({ topicId: topic.id }).subscribe(
            (res) => {
              this.snackBar.open("Deleted Successfully", "", {
                duration: 2000,
              });
              this.dialogRef.close();
            });
        },
        error => {

          this.snackBar.open("Some error occured", "", {
            duration: 2000,
          });
          this.dialogRef.close();
        }
      );

  }

}
