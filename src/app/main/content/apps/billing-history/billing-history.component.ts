import { Component, OnInit } from '@angular/core';
import { PaymentDetailsApi } from '../../../../core/sdk/services/custom/PaymentDetails'
import { FranchiseApi } from '../../../../core/sdk/services/custom/Franchise';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.scss']
})
export class BillingHistoryComponent implements OnInit {
  billing_details: any;
  franchiseId: any;

  constructor(public franchiseApi: FranchiseApi, private paymentdetais: PaymentDetailsApi) {

  }

  ngOnInit() {
    this.franchiseId = localStorage.getItem('franchise_id');
    this.franchiseApi.find({
      where: { id: this.franchiseId },
      include: { relation: "Billing" }
    }).subscribe((data) => {
      console.log(data, "datadatadatadata")
      let x = JSON.parse(JSON.stringify(data[0]))
      this.billing_details = x.Billing
      console.log(this.billing_details, "cards")
    })

  }

}
