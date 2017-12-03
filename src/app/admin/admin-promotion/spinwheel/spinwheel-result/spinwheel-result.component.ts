import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AdminSpinwheelService } from '../shared/admin-spinwheel.service'
import { UserSpinWheelResult } from '../shared/user-spinwheel-result';

@Component({
  selector: 'app-spinwheel-result',
  templateUrl: './spinwheel-result.component.html',
  styleUrls: ['./spinwheel-result.component.css']
})
export class SpinwheelResultComponent implements OnInit {

  userSpinWheelResults = new BehaviorSubject<UserSpinWheelResult[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminSpinwheelService: AdminSpinwheelService
  ) { }

  ngOnInit() {
    this.loadSpinWheelResult();
  }
  
  private loadSpinWheelResult() {
    this.adminSpinwheelService
        .getSpinwheelResult()
        .subscribe((userSpinWheelResults: UserSpinWheelResult[]) => this.userSpinWheelResults.next(userSpinWheelResults));
  }

  onProvidePrize(userSpinWheelResult: UserSpinWheelResult) {
    userSpinWheelResult.isProvidePrize = true;
    this.adminSpinwheelService
    .updateProvidePrize(userSpinWheelResult)
    .subscribe(() => this.loadSpinWheelResult());
  }

}
