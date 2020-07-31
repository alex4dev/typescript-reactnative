import {connect} from 'react-redux';
import React, {Dispatch} from 'react';
import {ActivityIndicator, View, StatusBar, Image, Platform} from 'react-native';
import {Button} from 'react-native-elements';
import styles from './LoginStyles';
import {Colors, Images, Fonts, Metrics} from 'themes';
import FadeInView from 'components/View/FadeInView';
import Dbg from 'utils/dbgUtils';
import {loginAction} from 'actions/Login/LoginActions';
import {RootState} from 'states';
import {getIsLoginLoading} from 'selectors/Login/LoginSelectors';
import {LoginAction} from 'actions';

interface StateToProps {
    isLoading: boolean;
}

interface DispatchFromProps {
    startLogin(domain?: string): void;
}

type Props = StateToProps & DispatchFromProps;
const TAG = 'LoginContainer';
class LoginContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    private onLoginButtonPressed = () => {
        Dbg.debug(TAG, 'onButtonTriggered');
        this.props.startLogin();
    };

    private onEnterpriseButtonPressed = () => {
        Dbg.debug(TAG, 'onButtonTriggered');
        // this.props.navigation.navigate(RouteNames.loginEntreprise);
    };

    public render(): any {
        const {isLoading} = this.props;
        return (
            <View style={styles.maincontainer}>
                <StatusBar
                    translucent={true}
                    backgroundColor={Colors.greyLight}
                    barStyle={'dark-content'}
                />
                <View style={styles.topContainer}>
                    <Image source={Images.logoFull} style={styles.logo} />
                </View>
                {!isLoading && (
                    <FadeInView style={styles.bottomContainer}>
                        <Button
                            title={'Se connecter'}
                            titleStyle={Fonts.style.normal}
                            containerStyle={styles.button}
                            buttonStyle={{paddingVertical: Metrics.padding.medium}}
                            onPress={this.onLoginButtonPressed}
                        />
                        <Button
                            title={'Accéder à un sous-domaine dédié'}
                            titleStyle={[Fonts.style.normal, {color: Colors.blue}]}
                            containerStyle={[styles.button, {marginTop: Metrics.margin.base}]}
                            buttonStyle={{
                                paddingVertical:
                                    Platform.OS == 'android' ? Metrics.padding.medium : 0,
                                marginTop: Metrics.margin.base
                            }}
                            type="clear"
                            onPress={this.onEnterpriseButtonPressed}
                        />
                    </FadeInView>
                )}
                {isLoading && (
                    <View style={[styles.bottomContainer, {justifyContent: 'center'}]}>
                        <ActivityIndicator size="large" color={Colors.blue} />
                    </View>
                )}
            </View>
        );
    }
}

const mapStateToProps = (state: RootState): StateToProps => ({
    isLoading: getIsLoginLoading(state)
});

const mapDispatchToProps = (dispatch: Dispatch<LoginAction>): DispatchFromProps => ({
    startLogin: () => dispatch(loginAction.request(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
