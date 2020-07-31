import React, {PureComponent} from 'react';
import {View} from 'react-native';

import {Metrics, Colors} from 'themes';

interface Props {
    height?: string | number;
    width?: string | number;
    backgroundColor?: string;
}

export default class Separator extends PureComponent<Props> {
    static defaultProps = {
        width: '100%',
        height: Metrics.separator.small,
        backgroundColor: Colors.background
    };

    render() {
        const {height, width, backgroundColor} = this.props;

        return (
            <View
                style={{
                    height,
                    width,
                    backgroundColor
                }}
            />
        );
    }
}
