import { Component } from '@angular/core';
import {SymbolActions} from "./actions/symbol.actions";
import {Observable} from "rxjs";
import {select} from "ng2-redux";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [SymbolActions]
})
export class AppComponent {

  @select() symbols: Observable<any>;
  private symbolsList = [];

  constructor(private symbolActions: SymbolActions) {
    this.symbolActions._fetch();
    this.symbols.subscribe(symbols => {
      const {symbolsList, symbol} = symbols.toJS();
      this.symbolsList = symbolsList;
    });
  }
}
