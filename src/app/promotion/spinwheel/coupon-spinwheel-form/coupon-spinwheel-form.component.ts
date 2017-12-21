import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
// import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { SpinwheelPromotion } from '../shared/spinwheel-promotion';
import { SpinwheelService } from '../shared/spinwheel.service';
import { ValidUserCoupon } from '../shared/user-coupon';

import { ConfirmValidation } from '../shared/confirm-validation';



@Component({
  selector: 'app-coupon-spinwheel-form',
  templateUrl: './coupon-spinwheel-form.component.html',
  styleUrls: ['./coupon-spinwheel-form.component.css']
})
export class CouponSpinwheelFormComponent implements OnInit {

  form: FormGroup;
  formType: 'new' | 'edit';
  submitBtnTxt: 'PLAY';  
  spinwheelPromotion: SpinwheelPromotion;

  // validUserCoupon: Observable<ValidUserCoupon>;
  // validUserCoupon = new Subject<ValidUserCoupon>();
  validUserCoupon: ValidUserCoupon;
  @Output() formSubmit = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private spinwheelService: SpinwheelService) { }

  ngOnInit() {
    this.setFormType();
    this.buidForm();
    // this.getThisSpinwheelResult();
    this.setSubmitBtnTxt();

    this.form
      .valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(() => this.onValueChanged());

    this.onValueChanged();
  }

  // private buidForm() {
  //   this.form = this.formBuilder.group(
  //     {
  //       gameUsername: ['', Validators.required],
  //       // confirmGameUsername: ['', Validators.compose([ Validators.required, confirmUsername() ])],
  //       confirmGameUsername: ['', Validators.compose([ Validators.required])],
  //       couponCode: ['', Validators.required],
  //     },
  //     {
  //       validator: ConfirmValidation.MatchPassword 
  //     }
  //   ); 
  // }
  private buidForm() {
    this.form = this.formBuilder.group(
      {
        gameUsername: ['', Validators.required],
        // confirmGameUsername: ['', Validators.compose([ Validators.required])],
        couponCode: ['', Validators.required]
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
    gameUsername: "",
    // confirmGameUsername: "",
    couponCode: ""
  }

  private validationMessages = {
    gameUsername: {
      required: "ใส่ ชื่อ/User (ที่ใช้เข้าเล่น)"
    },
    // confirmGameUsername: {
    //   required: "ยืนยัน ชื่อ/User (ที่ใช้เข้าเล่น)",
    //   MatchPassword: "ชื่อ user ไม่ตรงกัน"    
    // },
    couponCode: {
      required: "ใส่รหัสคูปองที่คุณได้รับมา จากการเติมเงิน"
    }
  }

  onSubmit(event) {
    event.preventDefault();
    // console.log(this.form.value);
    // console.log(this.form.hasError);
    // console.log(this.form.get('body'));
    // this.formType === 'new'? this.createSpinwheelResult() : this.updateSpinwheelResult();
    this.validateCoupon();
    
    // if(!this.form.hasError) {
    //   this.validateCoupon();
    // }
    // else {
    //   console.log(this.form.value.formErrors);
    // }
  }

  private setFormType() {
    this.formType  = this.route.snapshot.data.formType;
  }

  private setSubmitBtnTxt() {
    this.submitBtnTxt = 'PLAY';
  }

  private validateCoupon() {
    this.spinwheelService
      .validateCoupon(this.form.value)
      .subscribe((validUserCoupon: ValidUserCoupon) => {
          this.validUserCoupon = validUserCoupon;
        }
      );
  }

  onCheck() {
    console.log(this.validUserCoupon);
  }

  goBack(): void {
    // this.location.back();
    this.validUserCoupon = null;
  }

  // private updateSpinwheelResult() {
  //   const { id } = this.route.snapshot.params;
  //   this.spinwheelService
  //     .updateSpinwheelResult(id, this.form.value)
  //     .subscribe(({ _id }: Article) => this.router.navigate(['/articles']));
  // }

  // private getThisSpinwheelResult() {
  //   if(this.formType === 'new') return;

  //   const { id } = this.route.snapshot.params;

  //   this.spinwheelService
  //   .getOneSpinwheelResult(id)
  //   .subscribe(({  }: SpinwheelPromotion) => {
  //     this.form.setValue({  });
  //   });
  // }

  // private search(term: string): void {
  //   this.searchTerms.next(term);
  // }

  // private handleSearchTerm() {
  //   this.searchTerms
  //     .debounceTime(300)
  //     .distinctUntilChanged()
  //     .switchMap(
  //       (query: string) => this.articleService
  //         .search(query)
  //     )
  //     .subscribe((articles: Article[]) => this.articles.next(articles));
  // }  

  // private subscribeToParams() {
  //   this.route.queryParams.subscribe(
  //     ({title}) => this.getArticles()
  //   );
  // }

}

