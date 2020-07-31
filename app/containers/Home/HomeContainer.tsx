import {connect} from 'react-redux';
import React, {Dispatch} from 'react';
import {HomeDetails, RootState} from 'states';
import DefaultItem from 'components/ListItem/DefaultItem';
import Separator from 'components/Separator';
import {Images} from 'themes';
import {View, ActivityIndicator, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styles from './HomeStyles';
import {FlatList} from 'react-native-gesture-handler';
import {getHomeLoading, getActivityDetails} from 'selectors/Home/HomeSelectors';
import {AnyAction} from 'redux';
import {fetchActivityAction} from 'actions';

interface StateToProps {
    isLoading: boolean;
    details: Array<HomeDetails>;
}

interface DispatchToProps {
    requestData(): void;
}

type Props = StateToProps & DispatchToProps;

class HomeContainer extends React.Component<Props> {
    public componentDidMount(): void {
        this.props.requestData();
    }

    public keyExtractor = (item: any, index: number) => index.toString();

    public onRefresh = (): void => {
        this.props.requestData();
    };

    public onPressItem = (id: string): void => {
        const data: HomeDetails = this.props.details[id];
        if (data) {
            // TODO
        }
    };

    public renderItem = ({
        item,
        index
    }: {
        // tslint:disable-next-line:ter-indent
        item: HomeDetails;
        index: number;
        // tslint:disable-next-line:ter-indent
    }): JSX.Element => {
        const name: string = item.id;
        const artwork =
            item.details && item.details.download_url
                ? item.details.download_url
                : Images.defaultArtwork;
        return (
            <DefaultItem
                id={index.toString()}
                onPressItem={this.onPressItem}
                title={name}
                leftAvatar={artwork}
            />
        );
    };

    public itemSeparatorComponent = (): JSX.Element => {
        return <Separator height={1} />;
    };

    public render(): JSX.Element {
        const {details, isLoading} = this.props;
        const isEmpty: boolean = details && details.length <= 0;
        if (isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            );
        }
        if (isEmpty) {
            return (
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>{'Aucune donnée'}</Text>
                </View>
            );
        }
        return (
            <FlatList<HomeDetails>
                data={details}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.itemSeparatorComponent}
                keyExtractor={this.keyExtractor}
                onRefresh={this.onRefresh}
                refreshing={this.props.isLoading}
            />
        );
    }
}

const mapStateToProps = (state: RootState): StateToProps => ({
    isLoading: getHomeLoading(state),
    details: getActivityDetails(state)
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchToProps => ({
    requestData: () => dispatch(fetchActivityAction.request(''))
});

export default connect<StateToProps, DispatchToProps, {}, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);
