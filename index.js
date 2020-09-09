/**
 * @format
 */

import 'config/ReactotronConfig';
import {AppRegistry} from 'react-native';
import App from './app/containers/App';
import {name as appName} from './app.json';
// require('react-native').unstable_enableLogBox();

AppRegistry.registerComponent('TSBoilerplate', () => App);
