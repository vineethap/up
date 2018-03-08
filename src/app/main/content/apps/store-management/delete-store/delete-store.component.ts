import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StoreApi } from '../../../../../core/sdk/services/custom/Store';
import { Store } from '../../../../../core/sdk/models/Store';
import { LocationTempApi } from '../../../../../core/sdk/services/index';


@Component({
  selector: 'app-delete-store',
  templateUrl: './delete-store.component.html',
  styleUrls: ['./delete-store.component.scss']
})
export class DeleteStoreComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    private storeApi: StoreApi,
    private locationTempApi: LocationTempApi,
    public dialogRef: MatDialogRef < DeleteStoreComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}


  onSubmit(store) {
    this.storeApi.deleteById(store.id)
      .subscribe(
        data => {

          this.snackBar.open("Deleted Successfully", "", {
            duration: 2000,
          });
          this.dialogRef.close(data);
          this.locationTempApi.findOne({
            where: {
              store_id: store.id 

            }
          }).subscribe((res) => {
            var store = JSON.parse(JSON.stringify(res));
            this.locationTempApi.deleteById(store.id)
              .subscribe(
                data => {},
                error => {}
              );

          })
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
