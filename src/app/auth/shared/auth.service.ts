import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  loggedIn = new BehaviorSubject<boolean>(!!this.getToken());

  constructor(private http: Http,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {

  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  login(email: string, password: string) {
    const responseObservable = this.http
      .post('/api/users/authenticate', { email, password }, this.httpOptions());

    this.setTokenFromResponse(responseObservable);
    this.router.navigateByUrl('/admin');
    // this.location.back();
  }

  logout() {
    this.removeToken();
    this.loggedIn.next(false);
    this.router.navigateByUrl('/sign-in');
  }

  register(email, username, password) {
    const responseObservable = this.http
      .post('/api/users', { email, username, password }, this.httpOptions());

    this.setTokenFromResponse(responseObservable);
    this.router.navigateByUrl('/admin');
  }

  private httpOptions() {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return new RequestOptions({ headers });
  }

  private storeToken(token: string) {
    localStorage.setItem('id_token', token);
  }

  private removeToken() {
    localStorage.removeItem('id_token');
  }

  private getToken(): string {
    return localStorage.getItem('id_token');
  }

  private setTokenFromResponse(observable: Observable<Response>) {
    observable
      .map(({ headers }: Response) => headers.get('Authorization'))
      .map((token: string) => token.match(/Bearer (.*)/)[1])
      .subscribe((token: string) => {
        this.storeToken(token);
        this.loggedIn.next(true);
      });
  }

}
