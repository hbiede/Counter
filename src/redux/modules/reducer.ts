import { combineReducers, createStore, Store, Reducer, AnyAction } from 'redux';
import {
  persistStore,
  persistReducer,
  Persistor,
  Transform,
  PersistState,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import counters from 'Redux/modules/counters';

type PersistPartial = {
  _persist: PersistState;
};

type StoreAndPersistor<S> = {
  store: Store<S>;
  persistor: Persistor;
};

const reducers = {
  counters,
};

const mainReducer = combineReducers(reducers);

export type AppReduxState = ReturnType<typeof mainReducer>;

const createPersistedReducer = <S>(
  reducer: Reducer<S>,
  appBlacklist: string[] = [],
  transforms: Transform<any, any>[] = [], // eslint-disable-line @typescript-eslint/no-explicit-any
): StoreAndPersistor<S & PersistPartial> => {
  // fill out with any blacklisted items
  const blacklist = ([] as string[]).concat(appBlacklist);

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist,
    transforms,
    timeout: __DEV__ ? 10000 : 5000,
  };

  const persistedReducer = persistReducer<S, AnyAction>(persistConfig, reducer);

  const store = createStore<
    S & PersistPartial,
    AnyAction,
    Record<string, unknown>,
    Record<string, unknown>
  >(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default createPersistedReducer<AppReduxState>(mainReducer);
