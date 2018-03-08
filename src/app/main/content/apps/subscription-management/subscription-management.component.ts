import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Franchise } from '../../../../core/sdk/models/Franchise';
import { FranchiseApi } from '../../../../core/sdk/services/custom/Franchise';
import { PaymentDetailsApi } from '../../../../core/sdk/services/custom/PaymentDetails'
import { UserCardsApi } from '../../../../core/sdk/services/custom/UserCards'
import { NavigationEnd, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';

declare var Stripe: any;

@Component({
  selector: 'app-subscription-management',
  templateUrl: './subscription-management.component.html',
  styleUrls: ['./subscription-management.component.scss']
})
export class SubscriptionManagementComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  paymentform: FormGroup;
  formErrors: any;
  totalAmount: any;
  addPaymentDetails: any = {};
  url_params: any;
  _franchiseId: any;
  franchise_details: any;
  cards: any = [];
  _length: any = [];
  months: any = [];
  years: any = [];
  show_next = false;
  _params: any;
  addon = false;
  complete_process = false;
  paymentstatus = false;


  constructor(
    public franchiseApi: FranchiseApi,
    private _formBuilder: FormBuilder,
    private paymentdetais: PaymentDetailsApi,
    private usercards: UserCardsApi,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar) {
    this.formErrors = {
      number: {},
      cardname: {},
      cvv: {},
      exp_month: {},

      exp_year: {}

    };
    this.months = []
  }

  ngOnInit() {

    this._franchiseId = localStorage.getItem('franchise_id');


    this.route.params.subscribe(params => {
      this._params = params['users'];
      // this.firstFormGroup.value.noOfUsers=this._params
    })
    this.franchiseApi.find({
      where: { id: this._franchiseId },
      include: { relation: "cards" }
    }).subscribe((data) => {
      console.log("vvvvv", data)
      let x = JSON.parse(JSON.stringify(data[0]))
      this.cards = x.cards
      if (this.cards.length == 0) {
        this.show_next = true;
      }
    })


    this.url_params = localStorage.getItem('url')

    var year = new Date().getFullYear();
    var range = [];
    var _month = [];
    range.push(year);
    for (var i = 1; i < 20; i++) {
      range.push(year + i);
    }
    this.years = range;
    for (var j = 1; j <= 12; j++) {
      _month.push(j)
    }
    this.months = _month;
    this.firstFormGroup = this._formBuilder.group({
      noOfUsers: [this._params, Validators.required]
    });

    this.paymentform = this._formBuilder.group({
      number: [
        '', Validators.required
      ],
      cardname: ['', Validators.required],
      cvc: ['', Validators.required],
      exp_month: ['', Validators.required],

      exp_year: ['', Validators.required]
    });

    this.franchiseApi.find({
      where: { id: this._franchiseId }
    }).subscribe((data) => {
      this.franchise_details = JSON.parse(JSON.stringify(data[0]))
    })

  }
  openSnackBar(msg) {
    this.snackBar.open(msg, '', {
      duration: 2000
    });
  }
  pay() {
    let _payment
    var date = new Date();
    var time_stamp = date.getTime();
    console.log(this._params)
    if (this._params != undefined) {
      _payment = this.franchise_details.payment_details;
      var ONE_DAY = 1000 * 60 * 60 * 24

      let end = new Date(_payment.end_date);
      let expire = end.getTime();
      console.log(expire, time_stamp)
      if (expire > time_stamp) {

        var difference_ms = Math.abs(expire - time_stamp)

        var diff_days = Math.round(difference_ms / ONE_DAY);
        this.totalAmount = Math.round(this._params * diff_days * (4 / 30))
        this.addon = true;
      }
    } else {

      this.totalAmount = this.firstFormGroup.value.noOfUsers * 4;
    }

  }


  proceedPayment() {


    if (this.totalAmount) {

      var carno = Stripe.card.validateCardNumber(this.paymentform.value.number);
      var carexpr = Stripe.card.validateExpiry(this.paymentform.value.exp_month, this.paymentform.value.exp_year);
      var cardcvv = Stripe.card.validateCVC(this.paymentform.value.cvc);
      var cardtype = Stripe.card.cardType(this.paymentform.value.number);




      if (cardtype == "Unknown") {
        this.paymentstatus = false;
        this.complete_process = true;
        this.openSnackBar('Unknown Card type');
      }

      if (cardcvv == false) {
        this.paymentstatus = false;
        this.complete_process = true;

        this.openSnackBar('CVC not valid');
      }

      if (carexpr == false) {
        this.paymentstatus = false;
        this.complete_process = true;

        this.openSnackBar('Expiration date not valid');
      }
      if (carno == false) {
        this.paymentstatus = false;
        this.complete_process = true;

        this.openSnackBar('Card number not valid');
      }

      var card = {
        type: 'card',
        card: {
          number: this.paymentform.value.number,
          cvc: this.paymentform.value.cvc,
          exp_month: this.paymentform.value.exp_month,
          exp_year: this.paymentform.value.exp_year
        },
        usage: 'reusable'

      }
      Stripe.card.createToken(card.card, (status, response) => {
        if (status === 200) {
          var token = response.id;




          Stripe.source.create(card, (status, res) => {

            if (res) {

              var user_cards = {
                userId: this._franchiseId,
                franchiseId: this._franchiseId,
                sourceId: res.id,
                stripeToken: token,
                stripe_cusId: this.franchise_details.stripe_cusId,
                cardname: this.paymentform.value.cardname
              }
              this.usercards.create(user_cards)
                .subscribe(
                  (data) => {

                    var cardtype = Stripe.card.cardType(this.paymentform.value.number);
                    var payment = {
                      amount: this.totalAmount,
                      token: res.id,
                      franchiseId: this._franchiseId,
                      number: this.paymentform.value.number,
                      type: cardtype,
                      totalusers: this.firstFormGroup.value.noOfUsers,
                      stripe_cusId: this.franchise_details.stripe_cusId,
                      addon: this.addon,
                      savedcard: false
                    };


                    this.paymentdetais.payment(payment)
                      .subscribe(
                        (data) => {
                          this.complete_process = true;
                          this.paymentstatus = true;
                          this.franchiseApi.find({ where: { id: this._franchiseId } }).subscribe((data) => {
                            sessionStorage.removeItem('currentUser');
                            sessionStorage.setItem('currentUser', JSON.stringify(data[0]));
                            this.openSnackBar("Successfully completed the payment");

                            this.router.navigate(['/' + this.url_params + '/store-management']);
                            location.reload();
                          })

                        }, (error) => {
                          console.log(error, "paymnt");

                        });
                  }, (error) => {
                    this.openSnackBar("Something went wrong!please try again");

                    console.log(error, "UserCards")
                  });
              // })

            }
          });

          // this.excutepaymnt(token);
          // this.message = `Success! Card token ${response.card.id}.`;
        } else {
          console.log("er", response)
          // this.message = response.error.message;
          this.openSnackBar(response.error.message);
        }
      });
    } else {
      this.openSnackBar("Please enter the no. of users");
    }



  }

  //only number in the input text
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  ngOnChanges() {
    this.franchiseApi.find({ where: { id: this._franchiseId } }).subscribe((data) => {})

  }

  excutepaymnt(card) {
    //console.log(card);


    this.addPaymentDetails = {
      amount: this.totalAmount,
      token: card.sourceId,
      franchiseId: this._franchiseId,
      number: card.cardNum,
      type: card.type,
      totalusers: this.firstFormGroup.value.noOfUsers,
      stripe_cusId: this.franchise_details.stripe_cusId,
      addon: this.addon,
      savedcard: true

    }
    // console.log("cardtype", this.addPaymentDetails);


    this.paymentdetais.payment(this.addPaymentDetails)
      .subscribe(
        (data) => {
        
            this.router.navigate(['/' + this.url_params + '/store-management']);
            location.reload();
        }, (error) => {
          this.snackBar.open('Error!!! You can delete any existing card and continue payment with that card', 'X', {
            duration: 4000
          });

        });

  }
  Delete(card) {

    this.usercards.deleteById(card.id)
      .subscribe(
        data => {
          this.ngOnInit()
        }, error => {

        })


  }

}
