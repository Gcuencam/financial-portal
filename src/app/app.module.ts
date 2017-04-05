import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgReduxModule, NgRedux } from 'ng2-redux';
import * as Immutable from 'immutable';
import createLogger from 'redux-logger'

// Components
import { AppComponent } from './app.component';

// Pages
import { SymbolsComponent } from './pages/symbols/symbols.component';

// Routing
import { routing }  from './app.routing';

// Reducers
import reducer from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    SymbolsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    NgRedux
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<any>,) {
    // Redux Store Config
    const initialState = {};
    const reduxLoggerConfig = {
      stateTransformer(state) {
        const newState = {};
        for (let i of Object.keys(state)) {
          if (Immutable.Iterable.isIterable(state[i])) {
            newState[i] = state[i].toJS();
          } else {
            newState[i] = state[i];
          }
        }
        return newState;
      }
    };
    const middleware = [createLogger(reduxLoggerConfig)];

    ngRedux.configureStore(reducer, initialState, middleware);
  }
}
