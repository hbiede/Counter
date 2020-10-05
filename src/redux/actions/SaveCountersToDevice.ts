import AsyncStorage from '@react-native-community/async-storage';

import { Counter } from 'Statics/Types';
import { COUNTER_STORAGE_KEY } from 'Redux/actions/GetCounters';

const SaveCountersToDevice = (counters: Counter[]): void => {
  AsyncStorage.setItem(COUNTER_STORAGE_KEY, JSON.stringify(counters));
};

export default SaveCountersToDevice;
