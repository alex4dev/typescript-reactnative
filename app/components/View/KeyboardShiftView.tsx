import React, {useState, useEffect} from 'react';
import {StyleProp, ViewStyle, Animated, Dimensions, LayoutChangeEvent} from 'react-native';
import {useKeyboardHeight, useMeasure} from 'hooks';

interface Props {
    targetElement: React.Component;
    shiftDuration?: number;
    verticalOffset?: number;
    style?: StyleProp<ViewStyle>;
    onLayout?(event: LayoutChangeEvent): void;
}

const KeyboardShiftView: React.FC<Props> = (props) => {
    KeyboardShiftView.defaultProps = {
        shiftDuration: 250,
        verticalOffset: 0,
        style: {},
        onLayout: (): void => {}
    };
    const keyboardHeight = useKeyboardHeight(0);
    const targetMeasure = useMeasure(props.targetElement);
    const [shift] = useState(new Animated.Value(0)); // Initial value for shift: 0

    const {children: renderProp, shiftDuration, targetElement, verticalOffset, style} = props;

    useEffect(() => {
        const startAnimation = (val: number): void => {
            Animated.timing(shift, {
                toValue: val,
                duration: shiftDuration,
                useNativeDriver: true
            }).start();
        };

        if (!targetElement) {
            return;
        }
        if (!targetMeasure) {
            return;
        }

        if (keyboardHeight > 0) {
            const {height: windowHeight} = Dimensions.get('window');
            const fieldHeight = targetMeasure.height;
            const fieldTop = targetMeasure.pageY;
            const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight + verticalOffset);
            if (gap >= 0) {
                return;
            }
            startAnimation(gap);
        } else {
            startAnimation(0);
        }
    }, [targetElement, keyboardHeight, targetMeasure, verticalOffset, shift, shiftDuration]);
    return (
        <Animated.View
            onLayout={props.onLayout}
            style={[style, {transform: [{translateY: shift}]}]}>
            {renderProp}
        </Animated.View>
    );
};

export default KeyboardShiftView;
