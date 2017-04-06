import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgReduxModule, NgRedux } from 'ng2-redux';
import * as Immutable from 'immutable';
import createLogger from 'redux-logger'

// Components
import { AppComponent } from './app.component';

//9facef2e-9583-4a83-9f08-c87159f1c113
//6ed070c1-b334-4612-8fa8-169c5e45baef

// Pages
import { SymbolsComponent } from './pages/symbols/symbols.component';

// Routing
import { routing }  from './app.routing';

// Reducers
import reducer from './reducers';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// Extras
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule } from 'ng2-charts';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SymbolsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2SmartTableModule,
    ChartsModule
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
