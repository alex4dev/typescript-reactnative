import {DbgLevel} from 'utils/dbgUtils';

/**
 * This is a .js file
 */
export default {
    showDevScreens: __DEV__,
    useFixtures: false,
    ezLogin: false,
    yellowBox: __DEV__,
    reduxLogging: false,
    useReactotron: __DEV__,
    useConsole: false && __DEV__,
    dbgLevel: DbgLevel.ALL,
    reactotronHost: 'localhost'
};
