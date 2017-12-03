import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() isLoggedIn: boolean;
  @Output() logout = new EventEmitter<null>();

  onLogout() {
    this.logout.emit();
  }

}
