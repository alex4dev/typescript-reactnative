import Config from 'config/DebugConfig';
import Reactotron from 'reactotron-react-native';
import {applyMiddleware, compose, createStore, Reducer, StoreCreator} from 'redux';
// import {createLogger} from 'redux-logger';
import sagaMiddlewareFactory, {SagaIterator, Task} from 'redux-saga';
import {Store} from 'react-redux';
import DebugConfig from 'config/DebugConfig';
import {RootState} from 'states';

// creates the store
export default (rootReducer: Reducer<RootState>, rootSaga: () => SagaIterator): any => {
    /* ------------- Redux Configuration ------------- */

    const middleware = [];
    const enhancers = [];

    /* ------------- Saga Middleware ------------- */

    let opts = {};
    if (Config.useReactotron) {
        /*        const sagaMonitor: Monitor = Reactotron.createSagaMonitor();
        opts = {
            sagaMonitor
        }; */
    }
    const sagaMiddleware = sagaMiddlewareFactory(opts);
    middleware.push(sagaMiddleware);

    /* ------------- logger middleware ------------- */

    if (DebugConfig.reduxLogging) {
        const stateTransformer = (state: RootState): any => {
            const newState = {};
            const keys = Object.keys(state);
            keys.forEach((key) => {
                newState[key] = state[key];
            });
            return newState;
        };
        /*         const logger = createLogger({
            stateTransformer
        });
        middleware.push(logger); */
    }

    /* ------------- Assemble Middleware ------------- */

    enhancers.push(applyMiddleware(...middleware));

    // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
    /*     const createAppropriateStore: StoreCreator = Config.useReactotron
        ? Reactotron.createStore
        : createStore; */

    const createAppropriateStore: StoreCreator = createStore;

    // eslint-disable-next-line no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // create store
    const store: Store<RootState> = createAppropriateStore(
        rootReducer,
        composeEnhancers(...enhancers)
    );

    // kick off root saga
    const sagasManager: Task = sagaMiddleware.run(rootSaga);

    return {
        store,
        sagasManager,
        sagaMiddleware
    };
};
