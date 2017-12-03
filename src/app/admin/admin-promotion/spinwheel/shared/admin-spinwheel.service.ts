import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { AuthHttpService } from '../../../../auth/shared/auth-http.service';
import { UserSpinWheelResult } from '../shared/user-spinwheel-result'

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AdminSpinwheelService {

  private headers = new Headers({'Content-Type': 'application/json'});

  // private httpOptionsWithAuth() {
  //   const headers = new Headers({ 'Content-Type': 'application/json' });
  //   headers.append('Authorization',`Bearer ${this.authService.getToken()}`)
  //   return new RequestOptions({ headers });
  // }

  options: RequestOptionsArgs = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: AuthHttpService
  ) { }

  getSpinwheelResult(): Observable<UserSpinWheelResult[]> {
    return this.http
    .get(`api/spinwheels`, this.options)
    .map((res: Response) => res.json().userSpinwheelResults as UserSpinWheelResult[]);
  }

  updateProvidePrize(userSpinwheelResult: UserSpinWheelResult): Observable<UserSpinWheelResult> {    
      return this.http
      .put(`api/spinwheels`, userSpinwheelResult, this.options)
      .map((res: Response) => res.json().userSpinWheelResult as UserSpinWheelResult);
  }

}
