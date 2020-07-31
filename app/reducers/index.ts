import {Store} from 'react-redux';
import {combineReducers, Reducer} from 'redux';
import configureStore from './CreateStore';
import {RootState} from 'states';
import login from './Login/LoginReducers';
import home from './Home/HomeReducers';
import config from './Config/ConfigReducers';
import content from './Content/ContentReducers';
import root from 'sagas';

/* ------------- Assemble The Reducers ------------- */
export const reducers: Reducer = combineReducers<RootState>({
    home,
    config,
    login,
    content
});

/* ------------- redux hot reload ------------- */
export default (): Store => {
    // eslint-disable-next-line prefer-const
    let {store, sagasManager, sagaMiddleware} = configureStore(reducers, root);

    if (module.hot) {
        module.hot.accept(async () => {
            const nextRootReducer = require('./').reducers;
            store.replaceReducer(nextRootReducer);

            const newYieldedSagas = require('sagas').default;
            sagasManager.cancel();
            await sagasManager.done;
            sagasManager = sagaMiddleware.run(newYieldedSagas);
        });
    }

    return {store};
};
