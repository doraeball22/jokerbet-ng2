import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { AuthHttpService } from '../../../../auth/shared/auth-http.service';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { Coupon } from '../shared/coupon';

@Injectable()
export class CouponService {

  private headers = new Headers({'Content-Type': 'application/json'});

  options: RequestOptionsArgs = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: AuthHttpService
  ) { }

  createCoupon(newCoupons): Observable<Coupon[]> {
    return this.http
    .post(`api/coupons`, { newCoupons :newCoupons }, this.options)
    .map((res: Response) => res.json().coupons as Coupon[]);
  }

  
}
