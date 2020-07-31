import {Dimensions, Platform} from 'react-native';
import {isAndroid} from 'utils/platformUtils';

const {width, height} = Dimensions.get('window');

const Metrics = {
    doubleSection: 50,
    icons: {
        base: 24,
        medium: 30
    },
    images: {
        small: 34,
        medium: 50,
        large: 75,
        xlarge: 150,
        logo: 200
    },
    margin: {
        base: 10,
        small: 12,
        medium: 14
    },
    padding: {
        base: 10,
        small: 12,
        medium: 14
    },
    borderRadius: {
        base: 30
    },
    barHeight: {
        base: 30,
        medium: 60
    },
    screenHeight: width < height ? height : width,
    screenWidth: width < height ? width : height,
    viewportHeight: width < height ? height : width,
    viewportWidth: width < height ? width : height,
    separator: {
        small: 1,
        large: 5
    },
    space: 25
};

export default Metrics;
