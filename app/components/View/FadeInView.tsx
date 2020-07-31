import React, {useState} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';

interface Props {
    duration?: number;
    style?: StyleProp<ViewStyle>;
}

const FadeInView: React.FC<Props> = (props) => {
    FadeInView.defaultProps = {
        duration: 500,
        style: {}
    };

    const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: props.duration,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <Animated.View
            // Special animatable View
            style={[
                props.style,
                {
                    opacity: fadeAnim // Bind opacity to animated value
                }
            ]}>
            {props.children}
        </Animated.View>
    );
};

export default FadeInView;
