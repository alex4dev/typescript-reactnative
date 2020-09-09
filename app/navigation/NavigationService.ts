import {NavigationNavigateActionPayload} from '@react-navigation';

/**
 * This NavigationService is usefull for middleware integration
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 */
import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from 'constants/navigationConstants';
import Dbg from 'utils/dbgUtils';

export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();

let _delayedData: NavigationNavigateActionPayload; // navigator is not available when user come from deeplink

function navigate(routeScreenName: RouteNames, params?: any): void {
    const navigateData: NavigationNavigateActionPayload = {
        routeName: routeScreenName
    };

    if (params) {
        navigateData.params = params;
    }

    if (isReadyRef.current && navigationRef && navigationRef.current) {
        // navigationRef.current.navigate(name, params);
        navigationRef.current.navigate(routeScreenName);
        //_navigator.dispatch(NavigationActions.navigate(navigateData));
    } else {
        Dbg.warn(navigate.name, 'missing navigator ref');
        _delayedData = navigateData;
    }
}

function back(): void {
    if (isReadyRef.current && navigationRef.current) {
        navigationRef.current.back();
    } else {
        Dbg.warn(back.name, 'missing navigator ref');
    }
}

// add other navigation functions that you need and export them

export default {
    back,
    navigate
};
