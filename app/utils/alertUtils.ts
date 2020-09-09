import Dbg from 'utils/dbgUtils';
import {AlertNames} from 'constants/alertConstants';
import {AlertStatic, AlertButton} from 'react-native';
import {RouteNames} from 'constants/navigationConstants';
import {AlertModel} from 'actions/Base/AlertActions';
import {startupAction} from 'actions';
import {navigateAction} from 'actions/Base/NavigationActions';
import {invokeStoreApp} from './linkingUtils';

export function getAlertDataByName(name: AlertNames): AlertModel {
    let data: AlertModel;
    const defaultButtons = [
        {
            text: 'ok',
            call: () => Dbg.trace(getAlertDataByName.name, 'ok button pressed')
        }
    ];
    switch (name) {
        case AlertNames.networkerror:
            data = {
                name,
                title: 'Erreur',
                message: 'Probleme de réseau',
                buttons: [{text: 'Réessayer', put: startupAction.request()}]
            };
            break;
        case AlertNames.updateStoreAvailable:
            data = {
                name,
                title: 'Nouvelle version disponible',
                message: "Vous pouvez mettre à jour l'application sur le store",
                buttons: [
                    {
                        text: 'Pas maintenant',
                        put: navigateAction({name: RouteNames.login})
                    },
                    {
                        text: 'Mettre à jour',
                        call: () => invokeStoreApp()
                    }
                ]
            };
            break;
        case AlertNames.loginFailed:
            data = {
                name,
                title: "Echec de l'authentification",
                message: 'Un problème est survenu, veuillez réessayer',
                buttons: defaultButtons
            };
            break;
        case AlertNames.loginRequired:
            data = {
                name,
                title: 'Authentification requise',
                message: "Vous devez d'abord vous connecter",
                buttons: defaultButtons
            };
            break;
        default:
            data = {
                name,
                title: 'Alert',
                message: 'message d information',
                buttons: defaultButtons
            };
    }
    if (data.buttons === null) {
        data.buttons = defaultButtons;
    }
    data.options = {cancelable: false};
    return data;
}
