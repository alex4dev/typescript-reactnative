import Config from 'config/DebugConfig';
import Reactotron from 'reactotron-react-native';
// import {reactotronRedux as reduxPlugin} from 'reactotron-redux';
// import sagaPlugin from 'reactotron-redux-saga';

if (Config.useReactotron) {
    // https://github.com/infinitered/reactotron for more options!
    Reactotron.configure({name: 'Glowbl App', host: Config.reactotronHost})
        .useReactNative()
        // .use(reduxPlugin())
        // .use(sagaPlugin())
        .connect();

    // Let's clear Reactotron on every time we load the app
    Reactotron.clear();

    // Totally hacky, but this allows you to not both importing reactotron-react-native
    // on every file.  This is just DEV mode, so no big deal.
    // console.tron = Reactotron; // tslint:disable-line
}
