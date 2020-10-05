import AsyncStorage from '@react-native-community/async-storage';

import GetCounters, { COUNTER_STORAGE_KEY } from 'Redux/actions/GetCounters';

describe('Get Counters action', () => {
  it('Get from async storage', () => {
    GetCounters();
    expect(AsyncStorage.getItem).toBeCalledWith(COUNTER_STORAGE_KEY);
  });
});
