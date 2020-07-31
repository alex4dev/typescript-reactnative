import {isAndroid, isiOS} from 'utils/platformUtils';
import {Platform, Linking} from 'react-native';
import Dbg from 'utils/dbgUtils';
import AppConfig from 'config/AppConfig';

export function invokeStoreApp(): void {
    let uri: string;
    if (isAndroid()) {
        uri = AppConfig.playstoreUri;
    } else if (isiOS()) {
        uri = AppConfig.appstoreUri;
    } else {
        Dbg.warn(invokeStoreApp.name, 'cannot invoke store app on os :', Platform.OS);
    }
    try {
        Linking.openURL(uri);
    } catch (e) {
        Dbg.error(invokeStoreApp.name, e);
    }
}

export function invokeBrowser(url: string): void {
    Linking.canOpenURL(url).then((supported) => {
        if (supported) {
            Linking.openURL(url);
        } else {
            Dbg.error(invokeBrowser.name, "Don't know how to open URI: " + url);
        }
    });
}
