import { Component } from '@angular/core';
import * as typelessPackage from 'typeless-package';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from './auth/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  isLoggedIn: BehaviorSubject<boolean>;
  
  constructor(private authService: AuthService) {
  
  }
  
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  
  logout() {
    this.authService.logout();
  }
}
