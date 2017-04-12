import * as Immutable from 'immutable';

const INIT_STATE = Immutable.fromJS({
  symbolsList: [],
  symbol: {
    currency: {},
    issuer: {},
    region: {},
    risk_family: {},
    sector: {},
    prices: [],
    regionForm: "",
    riskFamilyForm: "",
    sectorForm: ""
  }
});

export function symbols(
  state = INIT_STATE,
  action) {

  const callbacks = {

    SET_SYMBOLS() {
      const symbols = Immutable.fromJS(action.payload);
      const newState = state.set('symbolsList', symbols);
      return newState;
    },

    SET_SYMBOL() {
      const symbol = Immutable.fromJS(action.payload);
      const newState = state.set('symbol', symbol);
      return newState;
    },

    default() {
      return state;
    }
  };

  return (callbacks[action.type] || callbacks.default)();
};
