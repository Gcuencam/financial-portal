import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SymbolActions} from "../../actions/symbol.actions";
import {Observable} from "rxjs";
import {select} from "ng2-redux";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  providers: [SymbolActions]
})
export class HeaderComponent implements OnInit {

  @select() symbols: Observable<any>;

  private symbol;
  private symbolList;

  constructor(private symbolActions: SymbolActions) {

    this.symbols.subscribe(symbols => {
      const {symbolsList, symbol} = symbols.toJS();
      this.symbol = symbol;
      this.symbolList = symbolsList
    });

  }

  ngOnInit() {
  }

}
