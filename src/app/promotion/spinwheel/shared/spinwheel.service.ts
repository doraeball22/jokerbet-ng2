import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { ValidUserCoupon } from '../shared/user-coupon';
import { UserSpinWheelResult } from '../shared/user-spinwheel-result';

@Injectable()
export class SpinwheelService {

  private validUserCoupon: ValidUserCoupon;
  private userSpinWheelResult: UserSpinWheelResult;

  private httpOptionsWithAuth() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization',`Bearer ${this.validUserCoupon.validCouponToken}`)
    return new RequestOptions({ headers });
  }

  private httpOptions() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers });
  }

  constructor(private http: Http) { }

  createSpinwheelResult(spinResult) {
    this.userSpinWheelResult = {
      user: this.validUserCoupon.userCoupon.gameUsername,
      coupon: this.validUserCoupon.userCoupon.coupon, 
      result: spinResult,
      isProvidePrize: false
   }

    this.http
      .post(`api/spinwheels`, this.userSpinWheelResult, this.httpOptionsWithAuth() )
      .subscribe((res: Response) => {
        this.validUserCoupon = null;
      } ) ; 
  }

  // searchValidCoupon(term: string): Observable<Coupon> {
  //   return this.http
  //              .get(`api/coupons/search?coupon=${term}`, {headers: this.headers})
  //              .map((res: Response) => res.json().coupon as Coupon)
  // }
  
  validateCoupon(userCoupon: ValidUserCoupon): Observable<ValidUserCoupon>{
        return this.http
              .post(`api/coupons/validate`, userCoupon, this.httpOptions())
              .map((res: Response) => this.validUserCoupon = res.json())
  }



}
