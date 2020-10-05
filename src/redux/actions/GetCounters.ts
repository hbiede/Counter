import AsyncStorage from '@react-native-community/async-storage';

import { setCountersLocal, SetCountersAction } from 'Redux/modules/counters';

export const COUNTER_STORAGE_KEY = 'COUNTERS_COUNTER_ARRAY';

const GetCounters = async (): Promise<SetCountersAction> => {
  return AsyncStorage.getItem(COUNTER_STORAGE_KEY).then((result) => {
    if (result) {
      return setCountersLocal(JSON.parse(result));
    }
    return setCountersLocal([]);
  });
};

export default GetCounters;
