import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject, BehaviorSubject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, 
} from 'rxjs/operators';

import { CouponService } from '../shared/coupon.service';
import { Coupon } from '../shared/coupon';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css']
})
export class CouponFormComponent implements OnInit {

  form: FormGroup;
  formType: 'new' | 'edit';
  submitBtnTxt: 'Create' | 'Update';  
  coupon: Coupon;
  coupons = new BehaviorSubject<Coupon[]>([]);

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private couponService: CouponService) { }

  ngOnInit() {
    this.setFormType();
    this.buidForm();
    this.setSubmitBtnTxt();

    this.form
      .valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(() => this.onValueChanged());

    this.onValueChanged();
  }

  private buidForm() {
    this.form = this.formBuilder.group(
      {
        prefix: ['jokerbet-', Validators.required],
        postfix: ['-2017', Validators.required],
        length: ['8', Validators.compose([Validators.min(8), Validators.max(15)])],
        count: ['1', Validators.compose([Validators.min(1), Validators.max(100)])]
      }
    ); 
  }

  private onValueChanged() {
    if(!this.form) return;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = this.form.get(field);

      if (control  && !control.valid) {
        const messages = this.validationMessages[field];

        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    prefix: "",
    postfix: "",
    length: "",
    count: ""
  }

  private validationMessages = {
    prefix: {
      required: "ใส่คำนำหน้า เช่น jokerbet-"
    },
    postfix: {
      required: "ใส่คำนำหน้า เช่น -2017"
    },
    length: {
      min: "อย่าใส่ต่ำกว่า 8",
      max: "อย่าใส่เกินกว่า 15"
    },
    count: {
      min: "อย่าใส่ต่ำกว่า 1",
      max: "อย่าใส่เกินกว่า 100"
    }
  }

  onSubmit(event) {
    event.preventDefault();
    // console.log(this.form.value);
    // console.log(this.form.errors);
    // console.log(this.form.get('body'));
    this.createCoupon();
  }

  private setFormType() {
    this.formType  = this.route.snapshot.data.formType;
  }

  private setSubmitBtnTxt() {
    this.submitBtnTxt = this.formType === 'new'? 'Create' : 'Update';
  }

  private createCoupon() {
    this.couponService
      .createCoupon(this.form.value)
      .subscribe((newCoupons: Coupon[]) => this.loadNewCoupons(newCoupons));
  }

  private loadNewCoupons(newCoupons) {
    this.coupons.next(newCoupons);
    // console.log(coupons);
  }

}
