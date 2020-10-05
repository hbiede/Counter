import { Counter } from 'Statics/Types';

const SET_COUNTERS = 'counters:SET_COUNTERS';

type CounterState = Readonly<{
  counters: Counter[];
}>;

const initialState: CounterState = {
  counters: [],
};

export interface SetCountersAction {
  type: typeof SET_COUNTERS;
  counters: Counter[];
}

export const setCountersLocal = (counters: Counter[]): SetCountersAction => ({
  type: SET_COUNTERS,
  counters,
});

export type CountersAction = SetCountersAction;

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
    default:
      return state;
  }
};

export default counterReducer;
