import * as Immutable from 'immutable';

const INIT_STATE = Immutable.fromJS({

});

export function symbol(
  state = INIT_STATE,
  action) {

  const callbacks = {

    default() {
      return state;
    }
  };

  return (callbacks[action.type] || callbacks.default)();
};
