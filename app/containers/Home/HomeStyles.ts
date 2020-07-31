import {StyleSheet} from 'react-native';
import {Colors, Metrics} from 'themes';

export const styles = StyleSheet.create({
    headerRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    loading: {
        flex: 1,
        justifyContent: 'center'
    },
    empty: {
        flex: 1,
        justifyContent: 'center'
    },
    emptyText: {
        alignSelf: 'center',
        color: Colors.black,
        opacity: 0.5
    },
    sectionHeader: {
        padding: Metrics.padding.medium,
        backgroundColor: Colors.background
    },
    footer: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: Metrics.screenWidth
    }
});

export default styles;
