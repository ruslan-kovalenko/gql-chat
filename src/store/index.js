import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { rootReducer, rootSaga } from './root-elements';
import createReduxPromiseListener from 'redux-promise-listener';
import { persistStore } from 'redux-persist';

const logger = createLogger({ collapsed: true });
const reduxPromiseListener = createReduxPromiseListener();
const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, reduxPromiseListener.middleware, sagaMiddleware];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(rootReducer, enhancer);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export const promiseListener = reduxPromiseListener;
export { store, persistor };
