import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AjaxService } from '../services/ajax.service';
import { environment } from '../../environments/environment';
import {promise} from "selenium-webdriver";

export const SYMBOL_ACTIONS = {
    SET_SYMBOLS: 'SET_SYMBOLS',
    SET_SYMBOL: 'SET_SYMBOL'
};

@Injectable()
export class SymbolActions {

    constructor(private redux: NgRedux<any>, private ajaxService: AjaxService,) {

    }

    setSymbols(symbols) {
        this.redux.dispatch({ type: SYMBOL_ACTIONS.SET_SYMBOLS, payload: symbols });
    }

    setSymbol(symbol) {
        console.log(symbol)
        this.redux.dispatch({ type: SYMBOL_ACTIONS.SET_SYMBOL, payload: symbol });
    }

    _fetch() {
        const endpoint = environment.api.symbols;
        this.ajaxService.getRequest(endpoint).subscribe(result => this.setSymbols(result.json()));
    }

    _fetchDetail(id) {
        const endpoint = environment.api.symbols + "/" + id;
        return this.ajaxService.getRequest(endpoint);
    }

}
