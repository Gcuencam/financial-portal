import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  @Input() symbols;

  constructor() { }

  ngOnInit() {
    console.log("asdfasdfasdf")
    console.log(this.symbols)
  }

}
