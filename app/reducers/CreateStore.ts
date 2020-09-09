import Config from 'config/DebugConfig';
import Reactotron from 'reactotron-react-native';
import reactotronconfig from 'config/ReactotronConfig';
import {applyMiddleware, compose, createStore, Reducer, StoreCreator} from 'redux';
// import {createLogger} from 'redux-logger';
import sagaMiddlewareFactory, {SagaIterator, Task, SagaMonitor} from 'redux-saga';
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
        const sagaMonitor: SagaMonitor = Reactotron.createSagaMonitor();
        opts = {
            sagaMonitor
        };
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
    if (Config.useReactotron) {
        enhancers.push(Reactotron.createEnhancer());
    }

    // create createStore
    const store: Store<RootState> = createStore(rootReducer, compose(...enhancers)); // const store = createStore(rootReducer, Reactotron.createEnhancer())

    // kick off root saga
    const sagasManager: Task = sagaMiddleware.run(rootSaga);

    return {
        store,
        sagasManager,
        sagaMiddleware
    };
};
