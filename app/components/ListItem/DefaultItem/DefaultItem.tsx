import React, {PureComponent} from 'react';
import {
    Text,
    View,
    TouchableNativeFeedback,
    Platform,
    TouchableHighlight,
    LayoutChangeEvent,
    StyleProp,
    ViewStyle
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';

import styles from 'components/ListItem/DefaultItem/DefaultItemStyles';
import {Metrics, Colors} from 'themes';

interface Props {
    onLayout?(event: LayoutChangeEvent): void;
    onPressItem?(id?: string): void;
    id?: string;
    type?: string;
    style?: StyleProp<ViewStyle>;
    leftIcon?: string;
    leftIconSize?: number;
    rightIcon?: string;
    rightIconSize?: number;
    leftAvatar?: any;
    leftAvatarSize?: number;
    leftAvatarRounded?: boolean;
    rightAvatarSize?: number;
    rightAvatar?: string;
    title?: string;
    titleNumberOfLines?: number;
    subtitle?: string;
    subtitleNumberOfLines?: number;
    padding?: number;
    minHeight?: number;
    maxHeight?: number;
    touchEnabled?: boolean;
}
interface State {
    width: number;
    height: number;
}
export default class DefaultItem extends PureComponent<Props, State> {
    static defaultProps = {
        type: 'material',
        style: {},
        leftAvatarSize: Metrics.images.large,
        rightAvatarSize: Metrics.images.medium,
        leftAvatarRounded: false,
        leftIconSize: Metrics.images.small,
        rightIconSize: Metrics.images.small,
        titleNumberOfLines: 0,
        subtitleNumberOfLines: 0,
        padding: Metrics.padding.base,
        minHeight: null,
        maxHeight: null,
        touchEnabled: true,
        onPressItem: () => {}
    };
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
    }
    public onPress = (): void => {
        this.props.onPressItem(this.props.id);
    };

    private onLayout = (event: LayoutChangeEvent): void => {
        this.setState({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height
        });
        this.props.onLayout && this.props.onLayout(event);
    };

    private onTextLayout = (event: LayoutChangeEvent): void => {};

    public renderView(): JSX.Element {
        const {
            type,
            leftIcon,
            rightIcon,
            leftIconSize,
            rightIconSize,
            leftAvatar,
            rightAvatar,
            leftAvatarSize,
            rightAvatarSize,
            padding,
            title,
            titleNumberOfLines,
            subtitle,
            subtitleNumberOfLines
        } = this.props;
        const textMaxWidth: number =
            this.state.width -
            (leftAvatar ? leftAvatarSize : 0) -
            (leftIcon ? leftIconSize : 0) -
            (rightAvatar ? rightAvatarSize : 0) -
            (rightIcon ? rightIconSize : 0) -
            padding * 2;
        return (
            <View style={[styles.container, {padding: this.props.padding}]}>
                <View style={styles.leftBlock}>
                    {leftAvatar && (
                        <Avatar
                            size={leftAvatarSize}
                            source={typeof leftAvatar === 'string' ? {uri: leftAvatar} : leftAvatar}
                            overlayContainerStyle={
                                this.props.leftAvatarRounded && {backgroundColor: 'transparent'}
                            }
                            avatarStyle={
                                this.props.leftAvatarRounded && {
                                    borderRadius: leftAvatarSize * 0.5,
                                    overflow: 'hidden'
                                }
                            }
                            // rounded={this.props.leftAvatarRounded}
                        />
                    )}
                    {leftIcon && (
                        <Icon size={leftIconSize} name={leftIcon} color={Colors.grey} type={type} />
                    )}
                    <View style={{maxWidth: textMaxWidth}} onLayout={this.onTextLayout}>
                        {title && (
                            <Text numberOfLines={titleNumberOfLines} style={styles.name}>
                                {title}
                            </Text>
                        )}
                        {subtitle && (
                            <Text numberOfLines={subtitleNumberOfLines} style={styles.name}>
                                {subtitle}
                            </Text>
                        )}
                    </View>
                </View>
                {rightAvatar && (
                    <Avatar rounded={true} size={rightAvatarSize} source={{uri: rightAvatar}} />
                )}
                {rightIcon && (
                    <Icon size={rightIconSize} name={rightIcon} color={Colors.grey} type={type} />
                )}
            </View>
        );
    }

    public renderAndroid(): JSX.Element {
        return (
            <TouchableNativeFeedback
                disabled={!this.props.touchEnabled}
                onPress={this.onPress}
                style={{flex: 1}}>
                {this.renderView()}
            </TouchableNativeFeedback>
        );
    }

    public renderIos(): JSX.Element {
        return (
            <TouchableHighlight
                disabled={!this.props.touchEnabled}
                onPress={this.onPress}
                underlayColor={Colors.touch}
                style={{flex: 1}}>
                {this.renderView()}
            </TouchableHighlight>
        );
    }

    public render(): JSX.Element {
        return (
            <View
                style={[
                    this.props.style,
                    {
                        minHeight: this.props.minHeight,
                        maxHeight: this.props.maxHeight
                    }
                ]}
                onLayout={this.onLayout}>
                {Platform.OS === 'ios' && this.renderIos()}
                {Platform.OS === 'android' && this.renderAndroid()}
            </View>
        );
    }
}
