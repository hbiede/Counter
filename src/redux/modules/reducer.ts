import type { Store, Reducer, UnknownAction } from 'redux';
import { combineReducers } from 'redux';
import type { Persistor, Transform, PersistState } from 'redux-persist';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { configureStore } from '@reduxjs/toolkit';

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
  transforms: Transform<unknown, unknown>[] = [],
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

  const persistedReducer = persistReducer<S, UnknownAction>(
    persistConfig,
    reducer,
  );

  const store = configureStore<S & PersistPartial, UnknownAction>({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export default createPersistedReducer<AppReduxState>(mainReducer);
