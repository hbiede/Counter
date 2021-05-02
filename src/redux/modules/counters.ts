import shortid from 'shortid';

import { AnyAction } from 'redux';

import { Counter } from 'Statics/Types';

const SET_COUNTERS = 'counters:SET_COUNTERS';
const UPDATE_COUNTER = 'counters:UPDATE_COUNTER';
const APPEND_COUNTER = 'counters:APPEND_COUNTER';
const REMOVE_COUNTER = 'counters:REMOVE_COUNTER';

type CounterState = Readonly<{
  counters: Counter[];
}>;

const defaultCounter = {
  increment: 1,
  name: 'New Counter',
  tally: 0,
};

const initialState: CounterState = {
  counters: [],
};

export interface SetCountersAction extends AnyAction {
  type: typeof SET_COUNTERS;
  counters: Counter[];
}

export const setCounters = (counters: Counter[]): SetCountersAction => ({
  type: SET_COUNTERS,
  counters,
});

export interface UpdateCounterAction extends AnyAction {
  type: typeof UPDATE_COUNTER;
  counter: Counter;
}

export const updateCounter = (counter: Counter): UpdateCounterAction => ({
  type: UPDATE_COUNTER,
  counter,
});

export interface AppendCounterAction extends AnyAction {
  type: typeof APPEND_COUNTER;
}

export const appendCounter = (): AppendCounterAction => ({
  type: APPEND_COUNTER,
});

export interface RemoveCounterAction extends AnyAction {
  type: typeof REMOVE_COUNTER;
  counter: Counter;
}

export const removeCounter = (counter: Counter): RemoveCounterAction => ({
  type: REMOVE_COUNTER,
  counter,
});

export type CountersAction =
  | SetCountersAction
  | UpdateCounterAction
  | AppendCounterAction
  | RemoveCounterAction;

const counterReducer = (
  state = initialState,
  action: CountersAction,
): CounterState => {
  switch (action.type) {
    case SET_COUNTERS:
      return {
        ...state,
        counters: action.counters,
      };
    case UPDATE_COUNTER: {
      const matchingCounterIndex = state.counters.findIndex(
        (counter) => counter.key === action.counter.key,
      );
      if (matchingCounterIndex >= 0) {
        // replace
        return {
          ...state,
          counters: [
            ...state.counters.slice(0, matchingCounterIndex),
            action.counter,
            ...state.counters.slice(matchingCounterIndex + 1),
          ],
        };
      }
      // append
      return {
        ...state,
        counters: [...state.counters, action.counter],
      };
    }
    case APPEND_COUNTER:
      return {
        ...state,
        counters: [
          ...state.counters,
          {
            ...defaultCounter,
            key: shortid(),
          },
        ],
      };
    case REMOVE_COUNTER: {
      const matchingCounterIndex = state.counters.findIndex(
        (counter) => counter.key === action.counter.key,
      );
      if (matchingCounterIndex >= 0) {
        return {
          ...state,
          counters: [
            ...state.counters.slice(0, matchingCounterIndex),
            ...state.counters.slice(matchingCounterIndex + 1),
          ],
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default counterReducer;
