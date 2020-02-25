import { authWatcher, authReducer } from './auth';
import { userDataReducer } from './user-data';
import { combineReducers } from 'redux';
import { all } from '@redux-saga/core/effects';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistAuthReducerConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
export const rootReducer = combineReducers({
  auth: persistReducer(persistAuthReducerConfig, authReducer),
  userData: userDataReducer,
});

export function* rootSaga() {
  yield all([authWatcher()]);
}
