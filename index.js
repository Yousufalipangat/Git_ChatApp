/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//import {HomeScreen} from './src/screens/HomeScreen'
import {ScreenRouter} from './src/ScreenRouter'

AppRegistry.registerComponent(appName, () => ScreenRouter);
