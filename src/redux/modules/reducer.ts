import { combineReducers } from 'redux';

import counters from 'Redux/modules/counters';

const reducers = {
  counters,
};

const mainReducer = combineReducers(reducers);

export type AppReduxState = ReturnType<typeof mainReducer>;

export default mainReducer;
