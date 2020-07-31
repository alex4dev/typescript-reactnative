import {StyleSheet} from 'react-native';
import {Colors, Metrics} from 'themes';

export const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: Colors.white,
        flexDirection: 'column',
        paddingHorizontal: Metrics.space,
        paddingVertical: Metrics.space
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContainer: {
        justifyContent: 'flex-end',
        maxHeight: 160,
        minHeight: 120
    },
    logo: {
        width: 245,
        height: 70,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    button: {flex: 1, left: 0, right: 0},
    enterpriseButton: {backgroundColor: Colors.white, color: Colors.primaryDark}
});

export default styles;
