import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';
import {Router} from "@angular/router";

@Component({
  selector: 'app-custom-render-component',
  templateUrl: 'custom-render-component.component.html',
  styleUrls: ['custom-render-component.component.sass']
})
export class CustomRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.value)
    this.renderValue = this.value.toString();
  }

  private triggerNavigate() {
    this.router.navigate(['/symbol', this.renderValue]);
  }

}
