import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Counter } from 'Statics/Types';

export type SetCountersAction = Counter[];

export type UpdateCounterAction = Counter;

export type AppendCounterAction = Partial<Counter> | undefined;

export type RemoveCounterAction = Counter;

type CounterState = Readonly<{
  counters: Counter[];
}>;

export const defaultCounter = {
  increment: 1,
  name: 'New Counter',
  tally: 0,
};

const initialState: CounterState = {
  counters: [],
};

const counterReducerSlice = createSlice({
  name: 'Counter',
  initialState,
  reducers: {
    appendCounter: (
      state: CounterState,
      action: PayloadAction<AppendCounterAction>,
    ): CounterState => ({
      ...state,
      counters: [
        ...state.counters,
        {
          ...defaultCounter,
          ...(action.payload || {}),
          key: nanoid(),
        },
      ],
    }),
    removeCounter: (
      state: CounterState,
      action: PayloadAction<RemoveCounterAction>,
    ): CounterState => {
      const matchingCounterIndex = state.counters.findIndex(
        (counter) => counter.key === action.payload.key,
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
    },
    setCounter: (
      state: CounterState,
      action: PayloadAction<SetCountersAction>,
    ): CounterState => ({
      ...state,
      counters: action.payload,
    }),
    updateCounter: (
      state: CounterState,
      action: PayloadAction<UpdateCounterAction>,
    ): CounterState => {
      const matchingCounterIndex = state.counters.findIndex(
        (counter) => counter.key === action.payload.key,
      );
      if (matchingCounterIndex >= 0) {
        // replace
        return {
          ...state,
          counters: [
            ...state.counters.slice(0, matchingCounterIndex),
            action.payload,
            ...state.counters.slice(matchingCounterIndex + 1),
          ],
        };
      }
      // append
      return {
        ...state,
        counters: [...state.counters, action.payload],
      };
    },
  },
});
export const { appendCounter, removeCounter, setCounter, updateCounter } =
  counterReducerSlice.actions;
export default counterReducerSlice.reducer;
