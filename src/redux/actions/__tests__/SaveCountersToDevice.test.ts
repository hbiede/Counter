import AsyncStorage from '@react-native-community/async-storage';

import SaveCountersToDevice from 'Redux/actions/SaveCountersToDevice';
import { COUNTER_STORAGE_KEY } from 'Redux/actions/GetCounters';

describe('Save Counters action', () => {
  it('Save to async storage', () => {
    SaveCountersToDevice([]);
    expect(AsyncStorage.setItem).toBeCalledWith(COUNTER_STORAGE_KEY, '[]');

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
    SaveCountersToDevice(newArray);
    expect(AsyncStorage.setItem).toBeCalledWith(
      COUNTER_STORAGE_KEY,
      JSON.stringify(newArray),
    );
  });
});
