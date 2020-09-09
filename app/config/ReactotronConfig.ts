import Config from 'config/DebugConfig';
import Reactotron, {ReactotronReactNative} from 'reactotron-react-native';
import {reactotronRedux as reduxPlugin} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import DebugConfig from 'config/DebugConfig';

let reactotronconfig;
if (Config.useReactotron) {
    // https://github.com/infinitered/reactotron for more options!
    reactotronconfig = Reactotron
        //.configure({name: 'Boilerplate App', host: DebugConfig.reactotronHost}) // to run Reactotron with a real device, uncomment this line and add your ip adress from ifconfig
        .useReactNative()
        .use(reduxPlugin())
        .use(sagaPlugin({}))
        .connect();

    // Let's clear Reactotron on every time we load the app
    Reactotron.clear();

    // Totally hacky, but this allows you to not both importing reactotron-react-native
    // on every file.  This is just DEV mode, so no big deal.
    // console.tron = Reactotron; // tslint:disable-line
}
export default reactotronconfig;
