import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AjaxService } from '../services/ajax.service';
import { environment } from '../../environments/environment';
import { LocalStorageService } from 'angular-2-local-storage';

export const SYMBOL_ACTIONS = {
  SET_SYMBOLS: 'SET_SYMBOLS',
  SET_SYMBOL: 'SET_SYMBOL'
};

@Injectable()
export class SymbolActions {

  constructor(private redux: NgRedux<any>, private ajaxService: AjaxService, private localStorageService: LocalStorageService) {

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

  addComment(comment) {
    let comments = this.localStorageService.get<Array<any>>('comments');
    if (comments == null) {
      comments = [];
    }
    comments.push(comment);
    this.localStorageService.set('comments', comments);
  }

  getComments(symbol) {
    let comments = this.localStorageService.get<Array<any>>('comments');
    if (comments == null) {
      return [];
    }
    return comments.filter(function(comment) {
      return comment._symbolId == symbol.id;
    });
  }

  removeComment(commentId) {
    let comments = this.localStorageService.get<Array<any>>('comments');
    console.log(comments)
    comments = comments.filter(function(_comment) {
      return _comment._id !== commentId;
    });
    console.log(comments)
    this.localStorageService.set('comments', comments);
  }

}
