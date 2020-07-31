import {connect} from 'react-redux';
import React from 'react';
import {Dispatch, AnyAction} from 'redux';
import Config from 'config/DebugConfig';
import {startupAction} from 'actions';
import Dbg from 'utils/dbgUtils';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {PayloadAction} from 'typesafe-actions';
import LoginContainer from '../Login/LoginContainer';
import HomeContainer from 'containers/Home/HomeContainer';
import {RouteNames} from 'constants/navigationConstants';
import {navigationRef, isReadyRef} from 'navigation/NavigationService';

interface DispatchFromProps {
    startup(): void;
}
type Props = DispatchFromProps;

const Stack = createStackNavigator();

React.useEffect(() => {
    return () => (isReadyRef.current = false);
}, []);

class RootContainer extends React.Component<Props> {
    public constructor(props) {
        super(props);
        Dbg.setLevel(Config.dbgLevel);
        if (Config.useReactotron) {
            Dbg.connectConsoleToReactotron();
        }
    }

    public componentDidMount(): void {
        this.props.startup();
    }

    public render(): JSX.Element {
        return (
            <NavigationContainer
                ref={navigationRef}
                onReady={() => {
                    isReadyRef.current = true;
                }}>
                <Stack.Navigator>
                    <Stack.Screen
                        name={RouteNames.login}
                        component={LoginContainer}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen name={RouteNames.home} component={HomeContainer} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchFromProps => ({
    startup: (): PayloadAction<string, void> => dispatch(startupAction.request(undefined))
});

export default connect<{}, DispatchFromProps>(null, mapDispatchToProps)(RootContainer);
