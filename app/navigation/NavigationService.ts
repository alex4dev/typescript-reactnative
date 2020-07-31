import {NavigationNavigateActionPayload} from '@react-navigation';
/**
 * This NavigationService is usefull for middleware integration
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 */
import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from 'constants/navigationConstants';

export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();

let _delayedData: NavigationNavigateActionPayload; // navigator is not available when user come from deeplink

function setTopLevelNavigator(ref) {
    navigationRef = ref;

    if (_delayedData) {
        navigate(_delayedData.routeName as RouteNames, _delayedData.params);
    }
}

function navigate(routeScreenName: RouteNames, params?: any): void {
    const navigateData: NavigationNavigateActionPayload = {
        routeName: routeScreenName
    };

    if (params) {
        navigateData.params = params;
    }

    if (isReadyRef.current && navigationRef.current) {
        navigationRef.current.navigate(name, params);

        //_navigator.dispatch(NavigationActions.navigate(navigateData));
    } else {
        _delayedData = navigateData;

        // Dbg.warn(navigate.name, 'missing navigator ref');
    }
}

function back(): void {
    if (isReadyRef.current && navigationRef.current) {
        navigationRef.current.back();
    } else {
        // Dbg.warn(back.name, 'missing navigator ref');
    }
}

// add other navigation functions that you need and export them

export default {
    back,
    navigate,
    setTopLevelNavigator
};
