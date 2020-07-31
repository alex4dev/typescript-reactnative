/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import * as React from 'react';
import {Provider, Store} from 'react-redux';
import {RootState} from 'states';
import RootContainer from './Root/RootContainer';
import createStore from 'reducers';

declare const global: {HermesInternal: null | {}};

// create our store
const {store} = createStore();

const App = (): JSX.Element => {
    return (
        <Provider store={store as Store<RootState>}>
            <RootContainer />
        </Provider>
    );
};

export default App;
