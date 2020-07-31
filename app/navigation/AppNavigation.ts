// import {NavigationRouteConfigMap, StackNavigatorConfig, createAppContainer} from 'react-navigation';
import styles from './Styles/NavigationStyles';
// import {Colors} from 'themes';

/* ------------- SCREENS ------------- */
import {RouteNames} from 'constants/navigationConstants';
import LoginContainer from 'containers/Login/LoginContainer';
import {HomeContainer} from 'containers';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

/**
 * Describes all possible navigation routes and which screen does that corresponds to.
 * One of the biggest differences I can see between "react-navigation" and the navigator
 * provided by "react-native" is that you won't be able to trigger an invalid route.
 */
/* const routeConfigMap: NavigationRouteConfigMap = {
    [RouteNames.launch]: {
        screen: LaunchScreen
    },
    [RouteNames.login]: {
        screen: LoginContainer
    },
    [RouteNames.home]: {
        screen: HomeContainer,
        navigationOptions: {
            title: 'home'
        }
    }
};
 */
/**
 * Configuration used to initialize the application. Which screen is going to be loaded and general parameters.
 */
/* const stackConfig: StackNavigatorConfig = {
    initialRouteName: RouteNames.login,
    headerMode: 'screen',
    headerLayoutPreset: 'left',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.white
        },
        headerTitleStyle: {
            color: Colors.black
        },
        headerBackTitle: null,
        gesturesEnabled: false
    }
};

const RootNavigator = createStackNavigator(routeConfigMap, stackConfig);

const AppNavigator = createAppContainer(RootNavigator);
 */
const Stack = createStackNavigator();
const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home">
                <Stack.Screen name="home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export {AppNavigation};

/**
 * This creates the StackNavigator we are going to be displaying.
 */
// export default AppNavigator;
