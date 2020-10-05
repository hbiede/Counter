import { createStore } from 'redux';

import mainReducer from 'Redux/modules/reducer';
import { setCountersLocal } from 'Redux/modules/counters';

describe('Counters reducer', () => {
  const store = createStore(mainReducer);
  it('Should run without crashing', () => {
    expect(store.getState().counters).not.toBeNull();
  });
  it('Should start with initial state', () => {
    expect(store.getState().counters).toStrictEqual({ counters: [] });
  });
  it('Should update with set action', () => {
    const newArray = [
      {
        name: 'Test 1',
        tally: 1,
        increment: 1,
      },
      {
        name: 'Test 2',
        tally: 30,
        increment: 10,
      },
    ];
    store.dispatch(setCountersLocal(newArray));
    expect(store.getState().counters).toStrictEqual({ counters: newArray });
  });
});
