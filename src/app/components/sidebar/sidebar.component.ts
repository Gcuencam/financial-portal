import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  public opened: Boolean;

  @Input() symbols: Array<any>;

  constructor() { }

  ngOnInit() {

  }

  public toggleSymbols() {
      this.opened = !this.opened;
  }

}
